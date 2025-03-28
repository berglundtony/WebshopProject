import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "./cartprovider";
import TopNavigation from './components/top-navigation/TopNavigation'; 
import Footer from "./components/footer/Footer";


export const metadata: Metadata = {
  title: "Webbshopen",
  description: "Here you can buy Items",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv">
      <CartProvider>
        <body>
        <TopNavigation/>
        <main>{children}</main>
        <Footer/>
        </body>
      </CartProvider>
    </html>
  );
}