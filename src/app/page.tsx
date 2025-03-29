"use client";
import { useEffect, useState } from "react";
import { getCampaignIds } from "./actions";
import { ProductResult } from "./types";
import styles from "./page.module.css";
import { CampaignProductList } from "./components/product-cards/campaignProducts";
import { ShowCampaingCategories } from "./components/category-icons/categoryIcons";
import Image from 'next/image';

export default function Home() {
  const [state, setState] = useState({ products: [], total: 0 } as ProductResult);
  const [isDoneLoading, setIsDoneLoading] = useState(false);
  useEffect(() => {
    const productIds: Array<string> = ["1", "2", "3", "8", "10","12","14"];
    getCampaignIds(productIds).then(n => {
      setState(n);
      setIsDoneLoading(true);
    });
  }, []);

  return !isDoneLoading ? <div className={styles.loadScreen}></div> : (
    <div className={styles.allWrapper}>
      <div className={styles.iconsWrapper}>
        <ShowCampaingCategories />
      </div>
      
      <div className={styles.discountWrapper}>
        <h1 className={styles.advertText}>25% rabatt på föjande varor under Påsken!</h1>
      </div>
      <div className={styles.campaignWrapper}>
        <div className={styles.imageWrapper}>
          <Image
            className={styles.image}
            src="/pask-02.png"
            width={350}
            height={350}
            alt={`Image of Eastern eggs in a basket`}
          />
          <div className={styles.overlay}>
            <h1>Oslagbara priser<br />under hela <br />Påsk kampanjen</h1>
          </div>
        </div>
        <CampaignProductList products={state.products ?? []} />
      </div>
    </div>
  );
}