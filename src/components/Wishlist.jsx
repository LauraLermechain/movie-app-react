import { useContext } from "react";
import { WishlistContext } from "../context/WishlistProvider";
import { Link } from "react-router-dom";
import { useState } from "react";

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
        <div>
            <h1>Ma wishlist</h1>
            <input
                type="text"
                placeholder="Rechercher dans la wishlist..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {filteredWishlist.map((movie) => (
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
