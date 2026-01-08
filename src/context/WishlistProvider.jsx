import { createContext, useState } from "react";

export const WishlistContext = createContext(null);

export default function WishlistProvider({ children }) {
    const [wishlist, setWishlist] = useState([]);

    function addToWishlist(movie) {
        setWishlist((prev) => [...prev, movie]);
    }

    function removeFromWishlist(movieId) {
        setWishlist((prev) => prev.filter((m) => m.id !== movieId));
    }

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
}
