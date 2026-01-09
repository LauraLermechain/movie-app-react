import { useContext } from "react";
import { Link } from "react-router-dom";
import { WishlistContext } from "../context/WishlistProvider";
import styles from "./Navbar.module.css";

export default function Navbar() {
    const { wishlist } = useContext(WishlistContext);

    return (
        <nav className={styles.nav}>
            <div className={styles.left}>
                <Link className={styles.link} to="/">Accueil</Link>
                <Link className={styles.link} to="/wishlist">Wishlist</Link>
            </div>

            <span className={styles.favBadge} title="Favoris">
                <span className={styles.favIcon}>🌿</span>
                <span className={styles.favText}>{wishlist.length}</span>
            </span>
        </nav>
    );
}
