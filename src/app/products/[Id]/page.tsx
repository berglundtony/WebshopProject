import { fetchProduct } from "@/app/actions";
import ProductDetails from "@/app/components/product-details/ProductDetails";
import { Product} from "@/app/types";

export default async function ProductDetail({params,
}: {
        params: { Id: string } | Promise<{ Id: string }>;
}) {
    const { Id } = await params;

    const data: Product | undefined = await fetchProduct(Id);
    return (
        data ? <ProductDetails product={data} /> : <div>Product not found</div>
    )
}