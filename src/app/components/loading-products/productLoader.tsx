import { getCampaignIds, Products } from "../../actions";
import { ProductResult } from "../../types";
import ProductList from "../product-cards/products"; 

async function fetchProducts(params: URLSearchParams): Promise<ProductResult> {
    const productIds = ["1", "2", "3", "8", "10", "12", "14"];
    const q = params.get("q");
    const filterBy = params.get("filterBy");
    const orderBy = params.get("orderBy");
    const order = params.get("order");
    const limit = params.get("limit");
    const skip = params.get("skip");

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
    if (limit) query = query.limit(parseInt(limit));
    if (skip) query = query.skip(parseInt(skip));

    const n = await query.fetch();

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

    return n;
}

export default async function ProductLoader({ params }: { params: URLSearchParams }) {
    const productsData = await fetchProducts(params);
    return <ProductList products={productsData.products} />;

}