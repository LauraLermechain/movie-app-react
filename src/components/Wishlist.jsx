import { useContext } from "react";
import { WishlistContext } from "../context/WishlistProvider";
import { Link } from "react-router-dom";

export default function Wishlist() {
    const { wishlist, removeFromWishlist } = useContext(WishlistContext);

    if (wishlist.length === 0) {
        return <p>Votre wishlist est vide.</p>;
    }

    return (
        <div>
            <h1>Ma wishlist</h1>

            {wishlist.map((movie) => (
                <div key={movie.id}>
                    <h3>{movie.title}</h3>

                    <img
                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                        alt={movie.title}
                    />

                    <p>Note : {movie.vote_average}</p>

                    <Link to={`/movie/${movie.id}`}>
                        <button>Voir les détails</button>
                    </Link>

                    <button onClick={() => removeFromWishlist(movie.id)}>
                        Retirer
                    </button>
                </div>
            ))}
        </div>
    );
}
