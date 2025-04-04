"use client";
import { useEffect, useState } from "react";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
const [theme, setTheme] = useState("light");
    useEffect(() => {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setTheme(prefersDark ? "dark" : "light");
    
        document.body.classList.add(theme);
        document.body.classList.remove(theme === "light" ? "dark" : "light");

    return () => {
        document.body.classList.remove("dark", "light"); 
    };
}, [theme]);

return <>{children}</>;
}