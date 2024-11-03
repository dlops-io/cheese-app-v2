import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <p>Copyright © {new Date().getFullYear()} formaggio.me - All Rights Reserved.</p>
        </footer>
    );
}