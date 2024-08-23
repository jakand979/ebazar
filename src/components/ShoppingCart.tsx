import { useEffect, useState } from "react";
import { Product } from "./Products";
import axios from "axios";
import { FiTrash } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

interface CartItem {
    id: number,
    product: Product,
    quantity: number
}

export interface Cart {
    cartId: number,
    userId: number,
    items: CartItem[]
}

const ShoppingCart = () => {
    const userData = localStorage.getItem("user");
    const user = userData ? JSON.parse(userData) : null;
    const [cart, setCart] = useState<Cart>({cartId: 0, userId: 0, items: []});
    const navigate = useNavigate();
    const [address, setAddress] = useState([]);
    const total = cart.items.reduce((acc, item) => {
        return acc + (item.product.price * item.quantity);
    }, 0);

    useEffect(() => {
        if (!user || !user.userId) return;

        const fetchCart = async () => {
            const res = await axios.get<Cart>("http://localhost:8080/carts/cart/" + user.userId, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            setCart(res.data);
        };

        fetchCart();
    }, []);

    const handleQuantityChange = async (index: number, newQuantity: number) => {
        if (newQuantity <= 0) {
            const updatedCart = { ...cart };
            updatedCart.items[index].quantity = cart.items[index].quantity;
            setCart(updatedCart);
            return;
        }

        const updatedCart = { ...cart };
        updatedCart.items[index].quantity = newQuantity;
        setCart(updatedCart);
        
        await axios.put("http://localhost:8080/carts/items/" + cart.items[index].id + "/" + newQuantity, null, {
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    const handleIncrease = (index: number) => {
        const newQuantity = cart.items[index].quantity + 1;
        handleQuantityChange(index, newQuantity);
    };
    
    const handleDecrease = (index: number) => {
        const newQuantity = cart.items[index].quantity - 1;
        handleQuantityChange(index, newQuantity);
    };

    const removeItemFromCart = async (itemId: number, index: number) => {
        await axios.delete("http://localhost:8080/carts/items/" + itemId, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        const updatedCart = { ...cart };
        updatedCart.items.splice(index, 1);
        setCart(updatedCart);
    };

    return (
        <div className="flex flex-col justify-center items-center w-full mt-20 pb-12">
            <h1 className="text-5xl font-montserrat font-bold">Koszyk</h1>
            {cart.items.length > 0 && <div className="flex flex-row flex-wrap w-full h-auto mt-16 pb-12 ml-20">
                {user && (cart !== undefined) && 
                    (cart.items.map((item, index) => (
                        <div key={item.id} className="flex flex-col items-center justify-start w-[440px] h-[580px] mr-4 mb-4 border-2">
                            <img src={item.product.img} alt={`product-${index + 1}`} className="w-[300px] h-[300px] scale-75 object-contain" />
                            <p className="flex justify-center items-center text-2xl font-montserrat font-extrabold w-11/12 h-[100px] text-balance text-center">{item.product.name}</p>
                            <h1 className="mt-2 text-2xl font-montserrat font-bold text-orange-700">{item.product.price} PLN x {item.quantity}</h1>
                        <div className="flex items-center justify-center gap-3 mt-7">
                            <button 
                                onClick={() => {
                                    handleDecrease(index)
                                    console.log(index);
                                }}
                                className="w-12 h-12 text-5xl font-montserrat font-extrabold rounded-lg bg-orange-700 text-center text-white pb-1 active:scale-95">
                                <h1>-</h1>
                            </button>
                            <input 
                                type="number" 
                                name="counter"
                                value={item.quantity}
                                onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                                className="w-32 h-12 mt-0 p-2.5 border-4 rounded-lg outline-none text-xl font-montserrat font-medium" 
                            />
                            <button 
                                onClick={() => handleIncrease(index)}
                                className="w-12 h-12 text-5xl font-montserrat font-extrabold rounded-lg bg-orange-700 text-center text-white pb-1 active:scale-95">
                                <h1>+</h1>
                            </button>
                            <FiTrash 
                                size={40} 
                                className={`inline-block ml-4 cursor-pointer active:scale-95`} 
                                onClick={() => {removeItemFromCart(item.id, index)} }
                            />
                        </div>
                    </div>))
                    )
                }
            </div>}
            {cart.items.length === 0 ? <h1 className="mt-12 text-4xl mr-auto ml-auto font-montserrat font-bold">Brak produktów.</h1> : <h1 className="text-4xl ml-2 font-montserrat font-bold">Razem: <h1 className="inline-block text-orange-700">{total} PLN</h1></h1>}
            {cart.items.length === 0 ? "" : 
                <button
                    onClick={() => navigate("/order-review")} 
                    className="w-fit mt-10 h-20 ml-3 p-5 rounded-md bg-orange-700 text-black text-2xl font-montserrat font-extrabold active:scale-95 ">Przejdź do podsumowania</button>}
        </div>
    );
};

export default ShoppingCart;