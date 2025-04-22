"use client";
import Image from "next/image";
import styles from "./campaign.module.css";
import { Product } from "../../types";
import { useCart } from "@/app/cartprovider";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";

export function CampaignProductList({ products }: { products: Product[] }) {
    return (
        <ul className={styles.cards} role="list">
            {products.map((product, index) => (
                <Card key={product.id || index} product={product} />
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
            <a className={styles.cardLink} onClick={(e) => {
                e.stopPropagation();
                router.push(`/products/${product.id}?discountedPrice=${discountedPrice}`)
            }}>
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

                        <p className={styles.paraRating}>Kundbetyg:&nbsp;&nbsp; {Array.from({ length: Math.round(product.rating) }, (_, i) => (
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
                                product.price = discountedPrice;
                                e.preventDefault();
                                e.stopPropagation();
                                addToCart(product);
                            }}
                        >
                            Lägg i varukorg
                        </button>
                    </div>
                </div>
                <div className={styles.overlay}>
                    <h1>Oslagbara<br />kampanjpriser 25% rabatt just nu!</h1>
                </div>
            </a>
        </li>
    );
}