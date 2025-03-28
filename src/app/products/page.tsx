"use client";

import { useEffect, useState } from "react";
import { ProductList } from "../components/product-cards/products";
import { Products } from "../actions";
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
  const q= params.get("q"); 

  useEffect(() => {
    const toInt = (val: unknown) => {
      if (typeof (val) !== "string") return null;
      return Number.parseInt(val);
    };

    let query:Products;
    
    if (q) {
      query = Products.GetProductBySearch(q)
    } else if (filterBy) {
      query = Products.getProductsByCategory(filterBy);
    } else {
      query = Products.GetProducts();
    }

    if (orderBy !== null && (order === "asc" || order === "desc")) {
      query = query.sortBy(orderBy, order); setIsDoneLoading(true);
    }

    if (toInt(limit) !== null) {
      query = query.limit(toInt(limit)!);
    }

    if (toInt(skip) !== null) {
      query = query.skip(toInt(skip)!);
    }

    const timeout = setTimeout(() => { // only render loading screen if request tameks more then 200 miliseconds
      setIsDoneLoading(false);
    }, (200));


// i had a SECTION HERE I AM MISSING

    query.fetch().then(n => {
      clearTimeout(timeout);
      // included filtration so just search done on product and not description (couldn't solve it via the API call)
       if (q) {
      n.products = n.products.filter(product =>
        product.title.toLowerCase().includes(q.toLowerCase())
      )
      n.total = n.products.length;
    }
      setState(n)
      setIsDoneLoading(true);
    });
  }, [limit, skip, orderBy, order, filterBy,q]);


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