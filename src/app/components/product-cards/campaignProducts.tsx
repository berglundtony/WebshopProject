"use client";
import Image from "next/image";
import styles from "./cards.module.css";
import { Product } from "../../types";
import { useCart } from "@/app/cartprovider";
import { useRouter } from "next/navigation";


export function CampaignProductList({ products }: { products: Product[] }) {
    return (
        <ul className={styles.cards} role="list">
            {products.map((product) => (
                <Card key={product.id} product={product} />
            ))}
        </ul>
    );
}

export function Card({ product }: { product: Product }) {
    const { addToCart } = useCart();
    const router = useRouter();
   
    return (
        <li className={styles.card} aria-label={`Länk till ${product.title}`}>
            <a onClick={(e) => {
                e.stopPropagation();
                router.push(`/products/${product.id}`);
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
                        <div>
                            <p className={styles.paraD}>Pris:</p>
                            <span className={styles.price}>&euro;{Math.ceil(product.price * 0.75)}</span>
                        </div>
                        <div>
                            <p className={styles.paraD}>Kundbetyg:</p>
                            {product.rating} av 5
                        </div>
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