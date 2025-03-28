import Image from 'next/image';
import styles from './footer.module.css';
import Link from 'next/link';

export default function Footer() {

    return (
        <footer className={styles.footWrapper}>
            <div className={styles.leftSide}>
                
                <div className={styles.contact}>
                    <p className={styles.footerPara}>Vid tekniska problem kontakata</p>
                    <p>IT-avdelningen:</p>
                        <p><i className="fa fa-phone" aria-hidden="true"></i>&nbsp;&nbsp; Telefon: <a
                            href="tel:+46201234567">020-1234567</a></p>
                        <p><i className="fa fa-envelope-o" aria-hidden="true"></i>&nbsp;&nbsp; <a
                            href="mailto:info@webshoppen.se">info@webshoppen.se</a></p>
                </div>
            </div>
            <div className={styles.rightSide}>
                <ul>
                    <li><Link href="/">Hem</Link></li>
                    <li><Link href="/products">Produkter</Link></li>
                    <li><Link href="/nyhetsbrev">Nyhetsbrev</Link></li>
                </ul>
            </div> 
        </footer>
    )
};