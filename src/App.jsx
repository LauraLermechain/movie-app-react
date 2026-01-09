import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import Wishlist from "./components/Wishlist";


export default function App() {
    return (
        <>
            <Navbar />

            <Routes>
                <Route path="/" element={<MovieList />} />
                <Route path="/movie/:id" element={<MovieDetails />} />
                <Route path="/wishlist" element={<Wishlist />} />
            </Routes>
        </>
    );
}
