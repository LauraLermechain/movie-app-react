import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { WishlistContext } from "../context/WishlistProvider";
import styles from "./MovieDetails.module.css";


export default function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);
    const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);

    const isInWishlist = wishlist.some((m) => m.id === movie?.id);

    useEffect(() => {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;

        Promise.all([
            fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`).then((r) => r.json()),
            fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`).then((r) => r.json()),
        ]).then(([movieData, creditsData]) => {
            setMovie(movieData);
            setCast((creditsData.cast || []).slice(0, 10)); 
        });
    }, [id]);

    if (!movie) return <p>Chargement...</p>;

    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : null;

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                {posterUrl && (
                    <img className={styles.poster} src={posterUrl} alt={movie.title} />
                )}

                <div className={styles.info}>
                    <h1 className={styles.title}>{movie.title}</h1>

                    <p className={styles.meta}>
                        ⭐ {movie.vote_average} • 📅 {movie.release_date}
                    </p>

                    <p className={styles.overview}>{movie.overview}</p>

                    <button
                        className={`${styles.favBtn} ${isInWishlist ? styles.favBtnActive : ""}`}
                        onClick={() => {
                            if (isInWishlist) removeFromWishlist(movie.id);
                            else addToWishlist(movie);
                        }}
                    >
                        {isInWishlist ? "Retirer des favoris" : "Ajouter aux favoris"}
                    </button>
                </div>
            </div>

            <h2 className={styles.sectionTitle}>Acteurs principaux</h2>

            <div className={styles.castGrid}>
                {cast.map((a) => {
                    const actorImg = a.profile_path
                        ? `https://image.tmdb.org/t/p/w185${a.profile_path}`
                        : null;

                    return (
                        <div className={styles.actorCard} key={a.id}>
                            {actorImg ? (
                                <img className={styles.actorImg} src={actorImg} alt={a.name} />
                            ) : (
                                <div className={styles.actorPlaceholder}>?</div>
                            )}

                            <div className={styles.actorName}>{a.name}</div>
                            <div className={styles.actorRole}>
                                {a.character ? a.character : ""}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}