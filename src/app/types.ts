export interface AppModel {
    products: Product[]   
}

export interface ProductResult {
    products: Product[],
    total: number
}

export interface Dimensions {
    width: number;
    height: number;
    depth: number;
}

export interface Meta {
    createdAt: string,
    updatedAt: string,
    barcode: string,
    qrCode: string
}

export interface Rating {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
}

export interface Product {
    id: number,
    title: string,
    description: string,
    category: string,
    price: number,
    discountPercentage: number,
    rating: number,
    stock: number,
    tags: string[],
    brand: string,
    sku: string,
    weight: number,
    dimensions: Dimensions,
    warrantyInformation: string,
    shippingInformation: string,
    availabilityStatus: string,
    reviews: Rating[]
    returnPolicy: string,
    minimumOrderQuantity: number,
    meta: Meta,
    images: string[], 
    thumbnail: string
}

export interface CartItem{
    id: number,
    title: string,
    images: string[],
    price: number,
    quantity: number
}

export interface CartContextType{
    cartItems: CartItem[];
    addToCart: (product: Product) => void;
    incrementCartItem: (id: number) => void;
    decrementCartItem: (id: number) => void;
    removeCartItem: (id: number) => void;

}

export interface NewLetterData { 
    email: string; 
    key: string, 
    confirmed: boolean
}

export interface TransactionResult<T> {
    status: T;
    message: string;
}



