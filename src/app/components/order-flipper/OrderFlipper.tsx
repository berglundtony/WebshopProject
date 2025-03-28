"use client";

import style from "./OrderFlipper.module.css";
import { useState } from "react";
export type Direction = "upp"|"down";

export default function OrderFlipper(props: {onChange: (d:Direction) => void}){    
    const [state, setState] = useState("down");

    const down = ()=> {
        setState("upp");
        props.onChange?.("upp");
    };
    const upp = ()=> {
        setState("down");
        props.onChange?.("down");
    };
    
    return state === "down" ? <button className={style.flipper} onClick={down}>▾</button>: <button className={style.flipper}  onClick={upp}>▴</button>
}   