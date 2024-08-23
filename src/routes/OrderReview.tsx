import Categories from "../components/Categories";
import Navbar from "../components/Navbar";
import Review from "../components/Review";

const OrderReview = () => {
    return (
        <div className="overflow-x-hidden">
            <Navbar />
            <Categories />
            <Review />
        </div>
    );
};

export default OrderReview;