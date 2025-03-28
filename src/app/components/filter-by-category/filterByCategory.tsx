import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SyntheticEvent, useEffect, useState } from "react";

import styles from "./filterByCategory.module.css";
import { FetchCategories } from "@/app/actions";

export default function FilterByCategory() {

    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams.toString());
    const pathname = usePathname();
    const router = useRouter();
    const [categories, setCategories] = useState(new Array<string>());

    useEffect(() => {
        FetchCategories().then(n => {
            setCategories(n);
        });
    }, []);

    const select = (e: SyntheticEvent<HTMLSelectElement, Event>) => {
        if (e.currentTarget.value === "none") {
            params.delete("filterBy");
        }
        else {
            params.set("filterBy", e.currentTarget.value);
        }
        params.delete("limit");
        params.delete("skip");
        
        UpdateUrl(params);
    };


    const UpdateUrl = (params: URLSearchParams) => {
        const item = `${pathname}?${params.toString()}`;
        router.push(item);
    };

    return <div className={styles.OrderBy}>
        <label className={styles.labelSelector} htmlFor="FilterBySelect"></label>
        <select onChange={select} defaultValue={params.get("orderBy") ?? "none"} id="FilterBySelect" className={styles.filterBySelect} name="FilterBySelect">
            {...[<option key="-1" value="none">- - - Alla Kategorier - - -</option>, ...categories.map((n, i) => <option className={styles.categoryOption} key={i} value={n}>{n.charAt(0).toUpperCase() + n.slice(1) }</option>)]}

        </select>
    </div>;
}