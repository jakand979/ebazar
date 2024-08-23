import { useEffect, useState } from "react";
import { Product } from "./Products";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface SearchResultsProps {
    searchText: string,
    filters: any
}

interface Favourite {
    userId: number,
    productId: number,
}

const SearchResults = (props: SearchResultsProps) => {
    const {searchText, filters} = props; 
    const [results, setResults] = useState<Product[]>([]);
    const [favourites, setFavourites] = useState<Favourite[]>([]);
    const userData = localStorage.getItem("user");
    const user = userData ? JSON.parse(userData) : null;
    const navigate = useNavigate();
    const [cartId, setCartId] = useState<number>();

    useEffect(() => {
        const fetchResults = async () => {
            if (searchText) {
                const res = await axios.get<Product[]>("http://localhost:8080/products/search/" + searchText, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    params: filters
                });

                setResults(res.data);
            }
        };

        fetchResults();
    }, [searchText, filters]);

    const fetchFavourites = async () => {
        if (user) {
            const res = await axios.get<Favourite[]>(`http://localhost:8080/favourites/${user.userId}`)
            setFavourites(res.data);
        }
    }

    useEffect(() => {
        fetchFavourites();
    }, []);

    const createFavourite = async (userId: number, productId: number) => {
        await axios.post("http://localhost:8080/favourites/create", null,
        {
            headers: {
                "Content-Type": "application/json"
            },
            params: {userId, productId}
        });

        fetchFavourites();
    };

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

    const handleFavouriteToggle = (userId: number, productId: number) => {
        if (user) {
            const isFavourite = favourites.some(fav => fav.userId === userId && fav.productId === productId);
            if (isFavourite) {
                deleteFavourite(userId, productId);
            } else {
                createFavourite(userId, productId);
            } 
        } else {
            navigate("/login");
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
        <div className="flex flex-row flex-wrap w-9/12 ml-12 mt-16 pb-10">
            {results.length === 0 ? (<h1 className="mt-auto mb-auto ml-auto mr-auto text-4xl font-montserrat font-bold">Brak wyników wyszukiwania.</h1>) : 
            results.map((result, index) => (
                <div key={index} className="flex flex-col items-center justify-start w-[440px] h-[580px] mr-4 mb-4 border-2">
                    <img src={result.img} alt={`product-${index + 1}`} className="w-[300px] h-[300px] scale-75 object-contain" />
                    <p className="flex justify-center items-center text-2xl font-montserrat font-extrabold w-11/12 h-[100px] text-balance text-center">{result.name}</p>
                    <h1 className="mt-4 text-2xl font-montserrat font-extrabold text-orange-700">{result.price} PLN</h1>
                    <div className="flex flex-row justify-center items-center mt-6 w-full">
                        <button onClick={() => handleAddToBasket(result.productId, 1, result.name)} className="w-fit p-2.5 bg-orange-700 rounded-md text-2xl font-montserrat font-extrabold active:scale-95"><FiShoppingCart size={40} className="inline-block"/> Dodaj do koszyka</button>
                        <FiHeart 
                            size={40} 
                            className={`inline-block ml-4  ${favourites.some(fav => fav.userId === user.userId && fav.productId === result.productId) ? "text-red-500 fill-current" : "text-gray-700"} cursor-pointer active:scale-95`} 
                            onClick={() => handleFavouriteToggle(user ? user.userId : 0, result.productId)}
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
            ))}
        </div>
    );
};

export default SearchResults;