import Categories from "../components/Categories";
import FavouriteProducts from "../components/FavouriteProducts";
import Navbar from "../components/Navbar";

const Favourites = () => {
    return (
        <div className="overflow-x-hidden">
            <Navbar />
            <Categories />
            <FavouriteProducts />
        </div>
    );
};

export default Favourites;