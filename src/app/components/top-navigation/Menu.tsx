'use client';

import Image from 'next/image';
import Link from 'next/link'
import { useState, useEffect} from 'react';
import styles from './topNavigation.module.css';
import { useCart } from '@/app/cartprovider';

export default function Menu() {
    const [open, setOpen] = useState(false); 
    const { cartItems } = useCart();

    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [open]);


    return (
        <>
            <Link className={styles.siteLogo} href="/" onClick={() => setOpen(false)}>webshoppen
            </Link><div className={styles.menuContainer}>
            <Image
                src='/menu.svg'
                alt=""
                width={36}
                height={36}
                className={styles.menuIcon}
                onClick={() => setOpen((prev) => !prev)} />  {open && (
                    <div className={styles.dropdownMenu}>
                        <Link href="./products" onClick={() => setOpen(false)}>Produkter </Link>
                        <Link href="./nyhetsbrev" onClick={() => setOpen(false)}>Nyhetsbrev </Link>
                        <Link href="./cart" onClick={() => setOpen(false)}>Varukorg 🛒
                            <span className={styles.cartCount}>
                                {cartItems.reduce((total, item) => total + item.quantity, 0)}
                            </span>
                        </Link>
                    </div>
                )}
        </div></>
    )
};