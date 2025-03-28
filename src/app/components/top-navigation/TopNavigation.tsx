'use client';
import Link from 'next/link';
import styles from './topNavigation.module.css';
import Menu from './Menu';
import { useCart } from "../../cartprovider"


export default function TopNavigation() {
    const { cartItems } = useCart();

    return (
        <nav className={styles.topNavigationContainer}>

            {/* MOBILE SCREENS  */}
            <div className={styles.mobileViewContainer}>
                <Menu />
            </div>

            {/* DESKTOPSCREENS */}
            <div className={styles.desktopViewContainer}>
                <div className={styles.logoWrapper}>
                    <Link className={styles.siteLogo} href="/">webshoppen</Link>
                </div>
                <div className={styles.navLinksWrapper}>
                    <Link href="/products">Produkter</Link>
                    <Link href="/nyhetsbrev">Nyhetsbrev</Link>
                    <div className={styles.navIconsWrapper}>
                        {/* <Link href="/login" className={styles.loginLink}>Login</Link> */}
                        <Link href="/cart">🛒
                            <span className={styles.cartCount}>
                                {cartItems.reduce((total, item) => total + item.quantity, 0)}
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}







{/*
        
                <HamburgerMenu />
            </div>

            "DESKTOP" SCREENS 
            <div className={styles.navbarContainerDesktop}> 
                <div className={styles.siteLogo}>
                    <Link href="/">WEBSHOPPEN</Link>
                </div>
                <div className={styles.links}>
                <Link href="#">Newsletter</Link>
                <Link href="#">Contact</Link>
                <Link href="#">About</Link>
                </div>
                <div className={styles.icons}>
                <Link href="/cart">🛒</Link>
                </div>
            </div>
        </nav>  
    )
}

*/}



