import About from "../components/About";
import Brands from "../components/Brands";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import MySlider from "../components/MySlider";

const Home = () => {
    return (
        <div className="overflow-hidden">
            <Navbar />
            <Categories />
            <MySlider />
            <Brands />
            <About />
            <Footer />
        </div>
    );
};

export default Home;