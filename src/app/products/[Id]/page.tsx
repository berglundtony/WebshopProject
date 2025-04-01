"use client";

import { fetchProduct } from "@/app/actions";
import ProductDetails from "@/app/components/product-details/ProductDetails";
import { Product} from "@/app/types";
import { useEffect, useState } from "react";


export default function ProductDetail({params,
}: {
        params: { Id: string } 
}) {
    const [product, setProduct] = useState<Product | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const resolvedParams = params instanceof Promise ? await params : params;
                const data: Product | undefined = await fetchProduct(resolvedParams.Id);

                if (data) {
                    setProduct(data);
                } else {
                    setError("Product not found");
                }
            } catch (err) {
                console.error(err);
                setError("Failed to load product");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [params]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return product ? <ProductDetails product={product} /> : <div>Product not found</div>;
}
