"use client";
// import { AppModel, } from "./types";
import { createContext, useContext, useState, ReactNode } from "react";
import { CartContextType, CartItem, Product } from "./types";


export const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode; }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const addToCart = (product: Product) => {
        setCartItems((prev) => {
            const existingItem = prev.find((item) => item.id === product.id);
            if (existingItem) {
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1, price: item.price} 
                        : item
                );
            } else {
                return [...prev, { ...product, quantity: 1 }];  
            }
        
        });
    };
    const incrementCartItem = (id: number) => {
        setCartItems((prevCart) => {
            return prevCart.map((item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
            );
        })
    }

    const decrementCartItem = (id: number) => {
        setCartItems((prevItems) =>
            prevItems.map(item =>
                item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
            )
        );
    };

    const removeCartItem = (id: number) => {
        setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, incrementCartItem, decrementCartItem, removeCartItem }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context;
}