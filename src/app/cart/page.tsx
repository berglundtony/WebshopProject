"use client"
import { useCart } from "../cartprovider";
// import { useEffect, useState } from "react";
// import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { CartItem } from "../types";
import styles from './cart.module.css';
import Image from 'next/image';


export default function CartPage() {
    const { cartItems, incrementCartItem, decrementCartItem, removeCartItem } = useCart();
    const totalPrice = Math.ceil(cartItems.reduce((total, item) => total + item.price * item.quantity, 0));
    const router = useRouter(); 
 

    return (
        <div className={styles.cartPage}>
            <h1 className={styles.cartHead}>Kundvagn</h1>
            {cartItems.length === 0 ? <h2 className={styles.emptyCart}>Kundvagnen är tom.</h2> : null}
            <ul className={styles.cartList}>
                {
                    cartItems.map((item: CartItem, index: number) => (
                        <li key={`${item.id}-${index}`} className={styles.cardCart}>
                            <Image
                                src={item.images[0]}
                                alt={item.title}
                                width={200}
                                height={200} />
                            <a className={styles.title} onClick={() => {
                                router.push(`/products/${item.id}?price=${item.price}`)
                            }}>
                                {item.title}
                            </a>
                            <div className={styles.s1}>
                                <h2><span className={styles.priceCurrency}>&euro;</span>
                                    <span className={styles.priceQuantity} aria-live="polite">{Math.ceil(item.price * item.quantity)}</span>
                                </h2>
                                <div className={styles.incredecre}>
                                    <button
                                        onClick={() => decrementCartItem(item.id)}
                                        aria-label={`Minska antal av ${item.title}`}
                                    >-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => incrementCartItem(item.id)}
                                        aria-label={`Öka antal av ${item.title}`}
                                    >+</button>
                                </div>
                                <button className={styles.wasteBaskeBtn} onClick={() => removeCartItem(item.id)}
                                    aria-label={`Ta bort ${item.title} från kundvagnen`}>
                                    <Image className={styles.wasteBasket} src='/red_wastebasket.svg'
                                        width={80}
                                        height={80}
                                        alt={`Image of ${item.title}`} />
                                </button>
                            </div>
                        </li>
                    ))
                }
                <div className={styles.totalPriceWrapper} >
                    <h2>
                        <span className={styles.fontBold}>Totalt: </span>
                        <span className={styles.currency}>&euro;</span>
                        <span className={styles.totalPrice} aria-live="polite">{totalPrice}</span>
                    </h2>
                </div>
            </ul>
        </div>  
    )
}
