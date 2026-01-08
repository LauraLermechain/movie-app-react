import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // useParams pour récupérer les paramètres de l'URL

export default function MovieDetail() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;

        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`)
            .then((res) => res.json())
            .then((data) => setMovie(data));
    }, [id]);

    if (!movie) return <p>Chargement...</p>;

    return (
        <div>
            <h1>{movie.title}</h1>
            <p><strong>Résumé :</strong> {movie.overview}</p>
            <p><strong>Date de sortie :</strong> {movie.release_date}</p>
            <p><strong>Note moyenne :</strong> {movie.vote_average}</p>
        </div>
    );
}
