import { useEffect, useState } from "react";
import { Product } from "./Products";
import axios from "axios";
import { FiShoppingCart, FiTrash } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Favourite {
    userId: number,
    productId: number,
}

const FavouriteProducts = () => {
    const [favourites, setFavourites] = useState<Favourite[]>([]);
    const [favouriteProducts, setFavouriteProducts] = useState<Product[]>([]);
    const userData = localStorage.getItem("user");
    const user = userData ? JSON.parse(userData) : null;
    const navigate = useNavigate();
    const [cartId, setCartId] = useState<number>();

    const fetchFavourites = async () => {
        if (user) {
            const res = await axios.get<Favourite[]>(`http://localhost:8080/favourites/${user.userId}`)
            setFavourites(res.data);
        }
    }

    useEffect(() => {
        fetchFavourites();
    }, []);

    let favouriteProductsIds: number[] = [];
    favourites.forEach(element => {
        favouriteProductsIds.push(element.productId);
    });
    const favouriteProductsIdsList = favouriteProductsIds.map(product => encodeURIComponent(product)).join(",");

    useEffect(() => {
        const fetchFavouriteProducts = async () => {
            if (favouriteProductsIdsList === "") return;
            const res = await axios.get("http://localhost:8080/products/by-ids", {
                headers: {
                    "Content-Type": "application/json"
                },
                params: {
                    productIds: favouriteProductsIdsList
                }
            });
            setFavouriteProducts(res.data);
        };

        fetchFavouriteProducts();
    }, [favourites]);

    const deleteFavourite = async (userId: number, productId: number) => {
        await axios.delete("http://localhost:8080/favourites/delete",
        {
            headers: {
                "Content-Type": "application/json"
            },
            params: { userId, productId }
        });

        fetchFavourites();
    };

    const handleFavouriteClick = (userId: number, productId: number) => {
        const isFavourite = favourites.some(fav => fav.userId === userId && fav.productId === productId);
        if (isFavourite) {
            deleteFavourite(userId, productId);
        }
    };

    useEffect(() => {
        const getCartIdByUser = async (userId: number) => {
            const res = await axios.get<number>("http://localhost:8080/carts/" + userId, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            
            setCartId(res.data);
        };

        getCartIdByUser(user.userId);
    }, []);

    const handleAddToBasket = async (productId: number, quantity: number, productName: string) => {
        if (user) {
            const res = await axios.post("http://localhost:8080/carts/add/" + cartId + "/" + productId + "/" + quantity, null, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            
            if (res.status === 200) toast.success(`Dodano ${productName} do koszyka!`);
        } else {
            navigate("/login");
        }
    };

    return (
        <div className="flex flex-col w-full justify-center items-center">
            <h1 className="text-5xl font-montserrat font-bold text-center mt-20">Ulubione produkty</h1>
            {favouriteProducts.map((product, index) => (
                <div className="flex flex-row w-full ml-12 flex-wrap gap-1 mt-20">
                    <div key={index} className="flex flex-col items-center justify-start w-[440px] h-[580px] border-2 mr-4 mb-4">
                    <img src={product.img} alt={`product-${index + 1}`} className="w-[300px] h-[300px] scale-75 object-contain" />
                    <p className="flex justify-center items-center text-2xl font-montserrat font-extrabold w-11/12 h-[100px] text-balance text-center">{product.name}</p>
                    <h1 className="mt-4 text-2xl font-montserrat font-extrabold text-orange-700">{product.price} PLN</h1>
                    <div onClick={() => handleAddToBasket(product.productId, 1, product.name)} className="flex flex-row justify-center items-center mt-6 w-full">
                        <button className="w-fit p-2.5 bg-orange-700 rounded-md text-2xl font-montserrat font-extrabold active:scale-95"><FiShoppingCart size={40} className="inline-block"/> Dodaj do koszyka</button>
                        <FiTrash
                            size={40} 
                            className={`inline-block ml-4 cursor-pointer active:scale-95`} 
                            onClick={() => handleFavouriteClick(user ? user.userId : 0, product.productId)}
                        />  
                    </div>
                    <ToastContainer
                        className="text-2xl text-left"
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
            ))}
            {favourites.length === 0 ? (<h1 className="mt-12 text-4xl mr-auto ml-auto font-montserrat font-bold">Brak ulubionych produktów.</h1>) : ""}
        </div>
    );
}

export default FavouriteProducts;