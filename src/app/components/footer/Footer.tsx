import styles from './footer.module.css';

export default function Footer() {

    return (
        <footer className={styles.footWrapper}>
            <div className={styles.leftSide}>
                
                <div className={styles.contact}>
                        <p><i className="fa fa-phone" aria-hidden="true"></i>Telefon: <a
                            href="tel:+46201234567">020-1234567</a></p>
                </div>
            </div>
            <div className={styles.rightSide}>
                <p><i className="fa fa-envelope-o" aria-hidden="true"></i><a href="mailto:info@webshoppen.se">info@webshoppen.se</a></p>
            </div> 
        </footer>
    )
};