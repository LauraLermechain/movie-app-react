import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export default function MovieList() {
    const [movies, setMovies] = useState([]);
    const [category, setCategory] = useState("popular");
    const [search, setSearch] = useState("");

    useEffect(() => {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;

        let url = `https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}`;

        if (search.trim() !== "") {
            url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=fr-FR&query=${encodeURIComponent(search)}`;
        }

        fetch(url)
            .then((res) => res.json())
            .then((data) => setMovies(data.results || []));

    }, [category, search]);

    return (
        <div>
            <h1>Films populaires</h1>
            <div>
                <button onClick={() => setCategory("now_playing")}>Now Playing</button>
                <button onClick={() => setCategory("popular")}>Popular</button>
                <button onClick={() => setCategory("top_rated")}>Top Rated</button>
                <button onClick={() => setCategory("upcoming")}>Upcoming</button>
            </div>
            <input
                type="text"
                placeholder="Rechercher un film..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div>
                {movies.map((m) => (
                    <div key={m.id}>
                        <h3>{m.title}</h3>
                        <img
                            src={`https://image.tmdb.org/t/p/w200${m.poster_path}`}
                            alt={m.title}
                        />
                        <p>Note : {m.vote_average}</p>
                        <Link to={`/movie/${m.id}`}>
                            <button>Voir les détails</button>
                        </Link>

                    </div>
                ))}
            </div>
        </div>
    );
}
