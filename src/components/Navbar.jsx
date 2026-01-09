import { useContext } from "react";
import { Link } from "react-router-dom";
import { WishlistContext } from "../context/WishlistProvider";

export default function Navbar() {
    const { wishlist } = useContext(WishlistContext);

    return (
        <nav>
            <Link to="/">Accueil</Link>

            <span style={{ marginLeft: "20px" }}>
                Wishlist : {wishlist.length}
            </span>
        </nav>
    );
}
