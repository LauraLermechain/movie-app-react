import { useEffect, useState } from "react";

export default function MovieList() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;

        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
            .then((res) => res.json())
            .then((data) => setMovies(data.results || []));
    }, []);

    return (
        <div>
            <h1>Films populaires</h1>

            <div>
                {movies.map((m) => (
                    <div key={m.id}>
                        <h3>{m.title}</h3>
                        <img
                            src={`https://image.tmdb.org/t/p/w200${m.poster_path}`}
                            alt={m.title}
                        />
                        <p>Note : {m.vote_average}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
