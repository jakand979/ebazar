import { useState, useEffect } from "react";
import axios from "axios";
import { FiShoppingCart, FiHeart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ProductProps {
    apiPath: string,
    filters: any
}

interface Favourite {
    userId: number,
    productId: number,
}

export interface Product {
    productId: number,
    name: string,
    price: number,
    categoryId: number,
    subcategoryId: number,
    color: string,
    size: string,
    brand: string,
    img: string
}

const Products = (props: ProductProps) => {
    const {apiPath, filters} = props;
    const [products, setProducts] = useState<Product[]>([]);
    const [favourites, setFavourites] = useState<Favourite[]>([]);
    const userData = localStorage.getItem("user");
    const user = userData ? JSON.parse(userData) : null;
    const [cartId, setCartId] = useState<number>();
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchAllProducts = async() => {
            const res = await axios.get<Product[]>("http://localhost:8080/products/allproducts" + apiPath, {
                headers: {
                    "Content-Type": "application/json"
                },
                params: filters
            });

            if (JSON.stringify(filters) === "{}" || (filters.minPrice === 0 && filters.maxPrice === 0)) return;
            
            setProducts(res.data);
        };

        fetchAllProducts();
    }, [apiPath, filters]);

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
            {products.length === 0 ? (<h1 className="ml-auto mr-auto mt-auto mb-auto text-4xl font-montserrat font-bold">Brak produktów.</h1>) : 
            products.map((product, index) => (
                <div key={index} className="flex flex-col items-center justify-start w-[440px] h-[580px] mr-4 mb-4 border-2">
                    <img src={product.img} alt={`product-${index + 1}`} className="w-[300px] h-[300px] scale-75 object-contain" />
                    <p className="flex justify-center items-center text-2xl font-montserrat font-extrabold w-11/12 h-[100px] text-balance text-center">{product.name}</p>
                    <h1 className="mt-4 text-2xl font-montserrat font-extrabold  text-orange-700">{product.price} PLN</h1>
                    <div className="flex flex-row justify-center items-center mt-6 w-full">
                        <button onClick={() => handleAddToBasket(product.productId, 1, product.name)} className="w-fit p-2.5 bg-orange-700 rounded-md text-2xl font-montserrat font-extrabold active:scale-95">
                            <FiShoppingCart size={40} className="inline-block"/> Dodaj do koszyka</button>
                        <FiHeart 
                            size={40} 
                            className={`inline-block ml-6
                                ${favourites.some(fav => fav.userId === user.userId && fav.productId === product.productId) ? "text-red-500 fill-current" : "text-gray-700"} cursor-pointer active:scale-95`} 
                            onClick={() => handleFavouriteToggle(user ? user.userId : 0, product.productId)}
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

export default Products;