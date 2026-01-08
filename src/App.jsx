import { useEffect, useState } from "react";

export default function App() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        async function load() {
            const apiKey = import.meta.env.VITE_TMDB_API_KEY;
            const res = await fetch(
                `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
            );

            const data = await res.json();

            setMovies(data.results);
        }

        load();
    }, []);

    return (
        <div>
            <h1>Films populaires</h1>
            <ul>
                {movies.map((m) => (
                    <li key={m.id}>{m.title}</li>
                ))}
            </ul>
        </div>
    );
}
