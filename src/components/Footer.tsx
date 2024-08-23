import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="flex justify-center w-screen max-h-screen mt-12 pb-12 bg-gray-200">
            <div className="flex gap-10 w-fit mr-28">
                <div className="mx-10 mt-10 text-center">
                    <h1 className="text-4xl font-montserrat font-bold">Kontakt</h1>
                    <h1 className="mt-6 text-2xl">517 670 561</h1>
                    <h1 className="mt-4 text-2xl">Anny Bykowej 21/37, 94-420 Łódź</h1>
                    <h1 className="mt-4 text-2xl">e-bazar@wp.pl</h1>
                </div>
                <div className="mx-10 mt-10 text-center">
                    <h1 className="text-4xl font-montserrat font-bold">Regulaminy</h1>
                    <Link to="/shop-policy" className="block mt-6 text-2xl hover:text-orange-600 hover:underline">Regulamin e-bazar</Link>
                    <Link to="/privacy-policy" className="block mt-4 text-2xl hover:text-orange-600 hover:underline">Polityka prywatności</Link>
                    <h1 className="mt-4 text-2xl">© 2024 e-bazar</h1>
                </div> 
            </div>
        </div>
    );
};

export default Footer;