import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export default function MovieList() {
    const [movies, setMovies] = useState([]);
    const [category, setCategory] = useState("popular");


    useEffect(() => {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;

        fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}`)
            .then((res) => res.json())
            .then((data) => setMovies(data.results || []));
    }, [category]);

    return (
        <div>
            <h1>Films populaires</h1>
            <div>
                <button onClick={() => setCategory("now_playing")}>Now Playing</button>
                <button onClick={() => setCategory("popular")}>Popular</button>
                <button onClick={() => setCategory("top_rated")}>Top Rated</button>
                <button onClick={() => setCategory("upcoming")}>Upcoming</button>
            </div>
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
