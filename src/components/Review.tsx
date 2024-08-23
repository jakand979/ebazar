import { useEffect, useState } from "react";
import axios from "axios";
import { Cart } from "./ShoppingCart";
import { useNavigate } from "react-router-dom";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Review = () => {
    const userData = localStorage.getItem("user");
    const user = userData ? JSON.parse(userData) : null;
    const [street, setStreet] = useState<string>("");
    const [houseNumber, setHouseNumber] = useState<string>("");
    const [flatNumber, setFlatNumber] = useState<string>("");
    const [postalCode, setPostalCode] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [cart, setCart] = useState<Cart>({cartId: 0, userId: 0, items: []})
    const navigate = useNavigate();
    
    const total = cart.items.reduce((acc, item) => {
        return acc + (item.product.price * item.quantity);
    }, 0);

    useEffect(() => {
        const fetchAddress = async () => {
            const userId = user.userId;
            const res = await axios.get("http://localhost:8080/addresses/getaddress/" + userId, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            setStreet(res.data.street);
            setHouseNumber(res.data.houseNumber);
            setFlatNumber(res.data.flatNumber);
            setPostalCode(res.data.postalCode);
            setCity(res.data.city);
        };

        fetchAddress();
    }, [user.userId]);

    const deliveryAddress = street && houseNumber && flatNumber && postalCode && city 
    ? `${street} ${houseNumber}${flatNumber ? "/" + flatNumber : ""}, ${postalCode} ${city}` : null;

    useEffect(() => {
        const fetchCart = async () => {
            const res = await axios.get<Cart>("http://localhost:8080/carts/cart/" + user.userId, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            setCart(res.data);
        };

        fetchCart();
    }, [user.userId]);

    return (
        <div className="flex flex-col justify-center items-center w-full mt-20 pb-12">
            <h1 className="text-5xl font-montserrat font-bold">Szczegóły zamówienia</h1>
            <div className="flex flex-col justify-center items-center mt-12">
                <h1 className="text-4xl font-montserrat font-semibold">Adres dostawy</h1>
                <p className="mt-6 text-2xl font-montserrat font-medium">{deliveryAddress}</p>
                <h1 className="mt-12 text-4xl font-montserrat font-semibold">Zamówione produkty</h1>
                {cart.items.map((item) => (
                    <>
                        <p className="mt-6 text-2xl font-montserrat font-medium"> <img src={item.product.img }className="inline-block w-[150px] h-[150px] scale-75 object-contain" /> {item.product.name}
                            <h1 className="inline-block ml-4 text-2xl font-montserrat font-semibold text-orange-700"> {item.product.price} PLN x {item.quantity}</h1>
                        </p>   
                    </>
                ))}
                <p className="mt-8 text-4xl font-montserrat font-bold">Razem: <h1 className="inline-block text-orange-700">{total} PLN</h1></p>
                <button
                    onClick={() => deliveryAddress !== null ? navigate("/payment", { state: { total: total, items: cart.items } }) : toast.error("Uzupełnij swój adres dostawy w profilu!")} 
                    className="w-fit mt-10 h-20 ml-3 p-5 rounded-md bg-orange-700 text-black text-2xl font-montserrat font-extrabold active:scale-95 ">
                        Przejdź do płatności
                </button>
                <ToastContainer
                className="text-2xl"
                position="top-center"
                autoClose={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                theme="light"
                transition={Slide}
            />
            </div>
        </div>
    );
};

export default Review;