"use client";

import { useEffect, useState } from "react";
import { ProductList } from "../components/product-cards/products";
import { getCampaignIds, Products } from "../actions";
import { ProductResult } from "../types";
import PaginationNav from "../components/navigation/pagination-nav";
import { useSearchParams } from "next/navigation";
import OrderBy from "../components/order-by/orderby";
import FilterByCategory from "../components/filter-by-category/filterByCategory";
import Search from "../components/search/search";
import style from "./page.module.css";


export default function ProductsPage() {
  const [state, setState] = useState({ products: [], total: 0 } as ProductResult);
  const [isDoneLoading, setIsDoneLoading] = useState(false);

  const params = useSearchParams();
  const limit = params.get("limit");
  const skip = params.get("skip");
  const orderBy = params.get("orderBy");
  const order = params.get("order");
  const filterBy = params.get("filterBy");
  const q = params.get("q");


  useEffect(() => {
    const productIds: Array<string> = ["1", "2", "3", "8", "10", "12", "14"];

    const toInt = (val: unknown) => (typeof val === "string" ? Number.parseInt(val) : null);

    let query: Products;

    if (q) {
      query = Products.GetProductBySearch(q);
    } else if (filterBy) {
      query = Products.getProductsByCategory(filterBy);
    } else {
      query = Products.GetProducts();
    }

    if (orderBy && (order === "asc" || order === "desc")) {
      query = query.sortBy(orderBy, order);
    }

    if (toInt(limit) !== null) {
      query = query.limit(toInt(limit)!);
    }

    if (toInt(skip) !== null) {
      query = query.skip(toInt(skip)!);
    }

    const timeout = setTimeout(() => {
      setIsDoneLoading(false);
    }, 200);

    (async () => {
      try {
        const n = await query.fetch();
        clearTimeout(timeout);

        if (q) {
          n.products = n.products.filter(product =>
            product.title.toLowerCase().includes(q.toLowerCase())
          );
          n.total = n.products.length;
        }

        const campaignData = await getCampaignIds(productIds);
        const campaignProductIds = campaignData.products.map(product => product.id);

        n.products = n.products.map(product => ({
          ...product,
          originalPrice: product.price,
          price: campaignProductIds.includes(product.id) ? Math.ceil(product.price * 0.75) : product.price,
        }));
        setState(n);
        setIsDoneLoading(true);
      } catch (error) {
        console.error("Fel vid hämtning av produkter:", error);
        setIsDoneLoading(true);
      }
    })();
  }, [limit, skip, orderBy, order, filterBy, q]);

    const totalLimit = 25;
    const pageCount = Math.ceil(state.total / totalLimit);

    return !isDoneLoading ? <div className={style.loadScreen}></div> :
      <div>
        <main>
          <div className={style.ToolPanel}>
            <FilterByCategory></FilterByCategory>
            <OrderBy></OrderBy>
            <Search />
          </div>
          <ProductList products={state.products ?? []} />
          <PaginationNav path={"/products"} pagesCount={pageCount} limit={totalLimit}></PaginationNav>
        </main>
      </div>;
  }