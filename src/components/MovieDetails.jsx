import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // useParams pour récupérer les paramètres de l'URL

export default function MovieDetail() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);

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

    return (
        <div>
            <h1>{movie.title}</h1>
            <p><strong>Résumé :</strong> {movie.overview}</p>
            <p><strong>Date de sortie :</strong> {movie.release_date}</p>
            <p><strong>Note moyenne :</strong> {movie.vote_average}</p>
            <h2>Acteurs principaux</h2>
            <ul>
                {cast.map((actor) => (
                    <li key={actor.cast_id || actor.id}>
                        {actor.name} {actor.character ? `(${actor.character})` : ""}
                    </li>
                ))}
            </ul>

        </div>
    );
}
