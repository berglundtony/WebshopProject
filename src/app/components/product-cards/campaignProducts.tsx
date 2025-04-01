"use client";
import Image from "next/image";
import styles from "./cards.module.css";
import { Product } from "../../types";
import { useCart } from "@/app/cartprovider";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";


export function CampaignProductList({ products }: { products: Product[] }) {
    return (
        <ul className={styles.cards} role="list">
            {products.map((product) => (
                <Card key={product.id} product={product} />
            ))}
        </ul>
    );
}
function DiscountedPrice(product: Product) {
    const discountedPrice = Math.ceil(product.price * 0.75);
    return discountedPrice;
}

export function Card({ product }: { product: Product }) {
    const { addToCart } = useCart();
    const router = useRouter();
    const discountedPrice = DiscountedPrice(product);
   
    return (
        <li className={styles.card} aria-label={`Länk till ${product.title}`}>
            <a onClick={(e) => {
                e.stopPropagation();
                router.push(`/products/${product.id}?${discountedPrice}`);
            }} className={styles.cardLink}>

                <h2>{product.title}</h2>
                <div className={styles.imageWrapper}>
                    <Image
                        className={styles.image}
                        src={product.images[0]}
                        width={80}
                        height={80}
                        alt={`Image of ${product.title}`}
                    />
                </div>
                <div className={styles.lowerHalf}>
                    <div>
                        <div className={styles.prices}>
                            <span className={styles.oldPrice}>Förr: &euro;{product.price}</span>
                            <span className={styles.discountedPrice}>Nu &euro;{discountedPrice}</span>
                        </div>
                       
                        <p className={styles.paraD}>Kundbetyg:&nbsp;&nbsp; {Array.from({ length: Math.round(product.rating) }, (_, i) => (
                            <Star key={i} className={styles.star} />
                        ))}
                        </p>
                        <p className={styles.paraSmall}>{product.description}</p>
                    </div>
                    <div className={styles.btnWrapper}>
                        <button
                            className={styles.btnBuy}
                            aria-label={`knapp för köp`}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                addToCart(product);
                            }}
                        >
                            Lägg i varukorg
                        </button>
                    </div>
                </div>
            </a>
        </li>
    );
}