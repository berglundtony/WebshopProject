"use client"
import { Product } from "@/app/types"
import styles from "./product-details.module.css";
import Image from "next/image";
import { generateUniqueId } from "@/app/actions";
import { useCart } from "@/app/cartprovider";
import { Inter } from 'next/font/google'
import { useState } from "react";

const inter = Inter({ subsets: ['latin'] });


export default function ProductDetails({ product }: { product: Product }) {
    const { addToCart } = useCart();
    const [selectedImage, setSelectedImage] = useState(product.images[0]); 
    return (
        <div className={inter.className}>
            <div className={styles.allWrapper}>
                <div className={styles.imageWrapper}>
                    <Image
                        className={styles.image}
                        src={selectedImage}
                        width={380}
                        height={380}
                        alt={`Image of ${product.title}`}
                    />
                                       
                    <p className={styles.price}>&euro;{product.price}</p>
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
                <div className={styles.infoWrapper}>
                    <h2 className={styles.h2Spacing}>{product.title}</h2>
                    <h3 className={styles.headersSpacing}>Beskrivning</h3>
                    <p className={styles.descript}>{product.description}</p>
                    <h3 className={styles.headersSpacing}>Reviews:</h3>
                    <ul className={styles.myUL} role="list">
                        {product.reviews.map(review =>
                            <li key={generateUniqueId()}>Betyg: {review.rating} - {review.comment}</li>
                        )}
                    </ul>
                    <h3 className={styles.headersSpacing}>Garanti</h3>
                    <p className={styles.descript}>{product.warrantyInformation}</p>
                    <h3 className={styles.headersSpacing}>Artikelnummer</h3>
                    <p className={styles.descript}>{product.sku}</p>
                    { product.images.length > 1 &&(
                        <ul className={styles.myUL} role="list">
                            <div className={styles.thumbs}>
                                {product.images.map((img, index) =>(
                                    <li key={generateUniqueId()}>
                                        <Image
                                            className={styles.thumb}
                                            src={img}
                                            width={380}
                                            height={380}
                                            alt={`Thumbnail ${index + 1} of ${product.title}`}
                                            onClick={() => setSelectedImage(img)} // Uppdaterar den stora bilden
                                            style={{ cursor: "pointer",borderRadius:"10px", boxShadow: selectedImage === img ? "0 0 15px rgba(0, 0, 0, 0.5)" : "none" }}
                                        />
                                    </li>
                                ))}
                            </div>
                        </ul>
                    )}
                </div>
            </div>
        </div>
    )
}