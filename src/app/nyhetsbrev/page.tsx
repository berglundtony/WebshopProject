"use client";
import { ReactNode, useEffect, useState } from "react";
import style from "./page.module.css";
import { renderToStaticMarkup } from "react-dom/server";
import { NewLetterData, TransactionResult } from "../types";
import { useSearchParams } from "next/navigation";


function send(email: string, title: string, content: ReactNode): Promise<boolean> {
  return new Promise<boolean>((resolve) => {

    const txt = encodeURI(renderToStaticMarkup(content));

    let dialog = document.querySelector("#fakeEmailDialog") as HTMLDialogElement;
    if (!dialog) {
      dialog = document.createElement("dialog");
      dialog.className = style.SendMailDialog;
      dialog.id = "fakeEmailDialog";
      document.body.appendChild(dialog);
    }
    dialog.innerHTML = "";

    const h3 = document.createElement("h3");
    h3.innerText = "Fake EmailSender";
    dialog.appendChild(h3);

    const CloseButton = document.createElement("button");
    CloseButton.innerText = "close";
    CloseButton.onclick = (e: Event) => {
      ((e.target as HTMLAnchorElement).parentElement as HTMLDialogElement).close();
      resolve(false);
    };
    dialog.appendChild(CloseButton);

    const a = document.createElement("a");
    a.innerText = "Send mail";
    a.onclick = (e: Event) => {
      ((e.target as HTMLAnchorElement).parentElement as HTMLDialogElement).close();
      resolve(true);
    };
    a.href = `mailto:${email}?subject=${title}&body=${txt}`;
    dialog.appendChild(a);
    dialog.showModal();
  });
}

const EMAIL_ERROR =  "Email kunde inte skickas";
const RECORD_NOT_FOUND = "Rad kunde inte hittas i registret";
const KEY_MISSMATCH = "Nyckel matchade inte";


async function register(email: string): Promise<TransactionResult<boolean>> {
  const key = crypto.randomUUID();
  const rex = /[^@]*@[^\.]+\..*/;
  if (!rex.test(email)) {
    return { status: false, message: "invalid email" };
  }

  const mailResult = await send(email, "bekräfta email", <div>
    <a href={`http://localhost:3000/nyhetsbrev?action=confirm&key=${key}&email=${email}`} >bekräfta email</a>
  </div>);

  if (mailResult) {
    localStorage.setItem("fake_NewsLetter_" + email, JSON.stringify({ email: email, key: key, confirmed: false })); //unconfirmed 
  }
  return { status: mailResult, message: !mailResult ? EMAIL_ERROR: "" };
}

async function confirm(email: string, key: string): Promise<TransactionResult<boolean>> {

  const str = localStorage.getItem("fake_NewsLetter_" + email);

  if (!str) {
    return { status: false, message: RECORD_NOT_FOUND};
  }

  const data = JSON.parse(str) as NewLetterData;

  if (data.key !== key) {
    return { status: false, message: KEY_MISSMATCH};
  }


  if (data.confirmed) {
    return { status: false, message: "Email var redan bekräftat." };
  }

  data.confirmed = true;

  const mailresult = await send(email, "Email bekräftning lyckades", <div>
    <h3>email verifieratl</h3>
    <p>Välkommen till Webbshopen </p>
    <a href={`http://localhost:3000/nyhetsbrev?action=unsub&key=${key}&email=${email}`} >Avregisterra från nyhetsbrev</a>
  </div>);

  if (mailresult) {
    localStorage.setItem("fake_NewsLetter_" + email, JSON.stringify(data)); //save as registered
  }

  return { status: mailresult, message: !mailresult ? EMAIL_ERROR: ""};
}

async function unRegister(email: string, key: string): Promise<TransactionResult<boolean>> {
  const index = "fake_NewsLetter_" + email;
  const item = localStorage.getItem(index);

  if (!item) {
    return { status: false, message: RECORD_NOT_FOUND };
  }

  const data = JSON.parse(item) as NewLetterData;

  if (data.key !== key) {
    return { status: false, message: KEY_MISSMATCH };
  }

  localStorage.removeItem(index);
  return { status: true, message: "" };
}

export default function NyhetsbrevPage() {
  const postForm = async (e: FormData) => {
    const email = e.get("email");
    if (!email) return;
    await register(email.toString());
  };

  const [message, setMessage] = useState("");

  const params = useSearchParams();
  const key = params.get("key");
  const email = params.get("email");
  const action = params.get("action");

  const [result, setResult] = useState("normal" as "normal" | "subDone" | "subFail" | "confDone" | "confFail" | "unSubDone" | "unSubFail");

  useEffect(() => {
    if (key && email && action === "unsub") {
      unRegister(email, key).then(n => {
        if (n.status) {
          setResult("subDone");
        } else {
          setResult("subFail");
          setMessage(n.message);
        }
      });
    }

    if (key && email && action === "confirm") {
      confirm(email, key).then(n => {
        if (n.status) {
          setResult("confDone");
        } else {
          setResult("confFail");
          setMessage(n.message);
        }
      });
    }
  }, [key, email, action]);



  switch (result) {
    case "confDone":
      return <div className={style.newsLetterBox}>Bekräftning email skickat</div>
    case "confFail":
      return <div className={style.newsLetterBox}>Kunde inte bekräfta email<br /><p className={style.error}>{message}</p></div>
    case "subDone":
      return <div className={style.newsLetterBox}>Email avregisterart</div>
    case "subFail":
      return <div className={style.newsLetterBox}>Kunde inte avregistrara<br /><p className={style.error}>{message}</p></div>
    default:
      return <div className={style.newsLetterBox}>
        <h3 className={style.massage}>Sign up for news letter</h3>
        <form action={postForm}>
          <div className={style.inputWrapper}>
            <input className={style.emailInput} id="email" name="email" type="email"></input>
            <button className={style.emailButton} type="submit">Register</button>
          </div>
        </form>
      </div>;
  }
}