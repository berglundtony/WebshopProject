"use client"
import {
    ChevronRight,
    ChevronLast,
    ChevronLeft,
    ChevronFirst,
} from "lucide-react";
import styles from "./nav.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";



export default function PaginationNav({
    pagesCount,
    limit
}: {
    path: string;
    pagesCount: number;
    limit: number;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Läs av nuvarande "skip" från URL:en
    const currentSkip = Number(searchParams.get("skip")) || 0;
    const validSkip = Math.max(0, currentSkip);
    const currentPage = Math.max(1, Math.floor(validSkip / limit) + 1);

    const updatePage = (newSkip: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("skip", newSkip.toString());
        params.set("limit", limit.toString());

        router.push(`${pathname}?${params.toString()}`);
    };

    const pageHandlers = {
        first: () => updatePage(0),
        last: () => updatePage((pagesCount - 1) * limit),
        prev: () => updatePage(Math.max(0, validSkip - limit)),
        next: () => {
            const nextSkip = validSkip + limit;
            if (nextSkip < pagesCount * limit) updatePage(nextSkip);
        },
    };

    return (
        <div className={styles.paginationNav}>
            <ChevronFirst size={24} onClick={pageHandlers.first} />
            <ChevronLeft size={24} onClick={pageHandlers.prev} />
            <span>Sida {currentPage} av {pagesCount}</span>
            <ChevronRight size={24} onClick={pageHandlers.next} />
            <ChevronLast size={24} onClick={pageHandlers.last} />
        </div>
    );
}

