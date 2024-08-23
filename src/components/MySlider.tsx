import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MySlider = () => {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        accessibility: false,
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnFocus: true,
        pauseOnHover: true
    };

    const slides = [
        "images/slider/football_training.jpg",
        "images/slider/volleyball_match.jpg",
        "images/slider/people_running.jpg",
        "images/slider/basketball_player.jpg",
        "images/slider/friends_playing_darts.jpg"
    ];

    return (
        <div className="relative z-10 overflow-hidden w-screen mt-12">
            <Slider {...settings}>
                {slides.map((src, index) => (
                    <div key={index} className="flex justify-center items-center w-screen h-[600px] outline-none">
                        <img src={src} alt={`slide-${index + 1}`} className="w-screen h-screen object-cover" />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default MySlider;