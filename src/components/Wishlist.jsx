import { useContext, useState } from "react";
import { WishlistContext } from "../context/WishlistProvider";
import { Link } from "react-router-dom";
import styles from "./Wishlist.module.css";

export default function Wishlist() {
    const { wishlist, removeFromWishlist } = useContext(WishlistContext);
    const [search, setSearch] = useState("");


    if (wishlist.length === 0) {
        return <p>Votre wishlist est vide.</p>;
    }

    const filteredWishlist = wishlist.filter((movie) =>
        movie.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className={styles.page}>
            <h1 className={styles.title}>Ma wishlist</h1>

            <input
                className={styles.input}
                type="text"
                placeholder="Rechercher dans la wishlist..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className={styles.grid}>
                {filteredWishlist.map((movie) => (
                    <div className={styles.card} key={movie.id}>
                        <img
                            className={styles.poster}
                            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                            alt={movie.title}
                        />

                        <h3 className={styles.movieTitle}>{movie.title}</h3>

                        <p className={styles.note}>⭐ {movie.vote_average}</p>

                        <div className={styles.actions}>
                            <Link to={`/movie/${movie.id}`}>
                                <button className={styles.button}>Détails</button>
                            </Link>

                            <button
                                className={styles.button}
                                onClick={() => removeFromWishlist(movie.id)}
                            >
                                Retirer
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}