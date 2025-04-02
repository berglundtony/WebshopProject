"use client"
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PaginationNav from "../components/navigation/pagination-nav";
import OrderBy from "../components/order-by/orderby";
import FilterByCategory from "../components/filter-by-category/filterByCategory";
import Search from "../components/search/search";
import ProductLoader from "../components/loading-products/productLoader";
import style from "./page.module.css";



export default function ProductsPage() {
  const params = useSearchParams();
  const totalLimit = 25;

  return (
    <div>
      <main>
        <div className={style.ToolPanel}>
          <FilterByCategory />
          <OrderBy />
          <Search />
        </div>
        <Suspense fallback={<div className={style.loadScreen}></div>}>
          <ProductLoader params={params} />
        </Suspense>
        <PaginationNav path={"/products"} pagesCount={Math.ceil(100 / totalLimit)} limit={totalLimit} />
      </main>
    </div>
  );
}