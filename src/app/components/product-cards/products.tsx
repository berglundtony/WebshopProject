"use client";
import Image from "next/image";
import styles from "./cards.module.css";
import { Product } from "../../types";
import { useCart } from "@/app/cartprovider";
import { useRouter } from "next/navigation";
import Star from "../star/star";

export function ProductList({ products }: { products: Product[] }) {
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
        {
          router.push(product.originalPrice !== product.price
            ? `/products/${product.id}?discountedPrice=${product.price}`
            : `/products/${product.id}`
          )
        }
      }}>
        <div className={styles.cardLink}>
          <h2 className={styles.title}>{product.title}</h2>
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
            {product.originalPrice !== product.price ? (
              <div className={styles.prices}>
                <p className={styles.oldPrice}>
                  <span className={styles.paraD}> Förr:</span>&euro;{product.originalPrice}
                </p>
                <p className={styles.discountedPrice}>
                  <span className={styles.paraD}> Nu:</span>&euro;{product.price}
                </p>
              </div>
            ) : (
              <p className={styles.price}>&euro; {product.price}</p>
            )}
            <div className={styles.paraD}>Kundbetyg:<Star score={product.rating}></Star></div>
            <p className={styles.paraSmall}>{product.description}</p>
            <div>
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
          </div>
        </div>
      </a>
    </li>
  );
}
