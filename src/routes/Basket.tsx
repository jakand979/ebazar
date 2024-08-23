import Categories from "../components/Categories";
import Navbar from "../components/Navbar";
import ShoppingCart from "../components/ShoppingCart";

const Basket = () => {
    return (
        <div className="overflow-x-hidden">
            <Navbar />
            <Categories />
            <ShoppingCart />
        </div>
    );
};

export default Basket;