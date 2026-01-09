import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./MovieList.module.css";

export default function MovieList() {
    const [movies, setMovies] = useState([]);
    const [category, setCategory] = useState("popular");
    const [search, setSearch] = useState("");

    useEffect(() => {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;

        let url = `https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}&language=fr-FR&page=1`;

        if (search.trim() !== "") {
            url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=fr-FR&query=${encodeURIComponent(
                search
            )}&page=1`;
        }

        fetch(url)
            .then((res) => res.json())
            .then((data) => setMovies(data.results || []));
    }, [category, search]);

    return (
        <div className={styles.page}>
            <h1 className={styles.title}>Films</h1>

            <div className={styles.controls}>
                <button
                    className={`${styles.button} ${category === "now_playing" ? styles.buttonActive : ""
                        }`}
                    onClick={() => setCategory("now_playing")}
                >
                    Now Playing
                </button>

                <button
                    className={`${styles.button} ${category === "popular" ? styles.buttonActive : ""
                        }`}
                    onClick={() => setCategory("popular")}
                >
                    Popular
                </button>

                <button
                    className={`${styles.button} ${category === "top_rated" ? styles.buttonActive : ""
                        }`}
                    onClick={() => setCategory("top_rated")}
                >
                    Top Rated
                </button>

                <button
                    className={`${styles.button} ${category === "upcoming" ? styles.buttonActive : ""
                        }`}
                    onClick={() => setCategory("upcoming")}
                >
                    Upcoming
                </button>

                <input
                    className={styles.input}
                    type="text"
                    placeholder="Rechercher un film..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className={styles.grid}>
                {movies.map((m) => (
                    <div className={styles.card} key={m.id}>
                        <img
                            className={styles.poster}
                            src={`https://image.tmdb.org/t/p/w200${m.poster_path}`}
                            alt={m.title}
                        />

                        <h3 className={styles.movieTitle}>{m.title}</h3>

                        <p className={styles.note}>⭐ {m.vote_average}</p>

                        <Link to={`/movie/${m.id}`}>
                            <button className={styles.detailsBtn}>Voir les détails</button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
