import axios from "axios";
import { useEffect, useState, ChangeEvent } from "react";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Product } from "../components/Products";
import { FiTrash } from "react-icons/fi";
import { MdAdd } from "react-icons/md";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Category {
    categoryId: number,
    name: string
}

interface Subcategory {
    subcategoryId: number,
    name: string
}

const AdminPanel = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [newProduct, setNewProduct] = useState<Product>({
        productId: 0,
        name: "Nazwa produktu",
        price: 1,
        categoryId: 1,
        subcategoryId: 1,
        color: "Kolor",
        size: "Rozmiar",
        brand: "Marka",
        img: "Scieżka do obrazka"
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await axios.get("http://localhost:8080/categories", {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            setCategories(res.data);
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchSubcategories = async () => {
            const res = await axios.get("http://localhost:8080/subcategories", {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            setSubcategories(res.data);
        };

        fetchSubcategories();
    }, []);


    useEffect(() => {
        const fetchProducts = async () => {
            const res = await axios.get("http://localhost:8080/products/all", {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            setProducts(res.data);
        };

        fetchProducts();
    }, []);

    const handleReturnToUserView = () => {
        navigate("/");
    };

    const handleDeletingProduct = async (productId: number) => {
        await axios.delete("http://localhost:8080/products/delete/" + productId, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        setProducts(products.filter(product => product.productId !== productId));
    };

    const handleUpdatingProduct = async (productId: number) => {
        const updatedProduct = products.find(product => product.productId === productId);
        if (updatedProduct === undefined) return;
        if (updatedProduct.name === "") {
            toast.error("Nazwa produktu nie może być pusta!");
            return;
        }
        if (updatedProduct.price < 1) {
            toast.error("Cena produktu musi być wyższa lub równa 1 PLN!");
            return;
        }
        if (updatedProduct.color === "") {
            toast.error("Kolor produktu nie może być pusty!");
            return;
        }
        if (updatedProduct.size === "") {
            toast.error("Rozmiar produktu nie może być pusty!");
            return;
        }
        if (updatedProduct.brand === "") {
            toast.error("Marka produktu nie może być pusta!");
            return;
        }
        if (updatedProduct.img === "") {
            toast.error("Ścieżka do obrazka produktu nie może być pusta!");
            return;
        }
        const res = await axios.put("http://localhost:8080/products/update/" + productId, updatedProduct, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (res.status === 200) {
            toast.success(`Produkt ${res.data.name} zaktualizowany pomyślnie!`);
        }
    };

    const handleProductChange = <T extends keyof Product>(index: number, field: T, value: Product[T]) => {
        const updatedProducts = [...products];
        updatedProducts[index][field] = value;
        setProducts(updatedProducts);
      };

    const handleNewProductChange = (field: keyof Product, value: any) => {
        setNewProduct({ ...newProduct, [field]: value });
    };

    const validateCategoryId = (categoryId: number) => {
        return categoryId >= 1 && categoryId <= 4;
    };

    const validateSubcategoryId = (subcategoryId: number, categoryId: number) => {
        if (categoryId === 1) {
          return subcategoryId >= 1 && subcategoryId <= 5;
        } else {
          return subcategoryId >= 6 && subcategoryId <= 10;
        }
    };

    const handleAddingProduct = async () => {
        if (newProduct.name === "") {
            toast.error("Nazwa produktu nie może być pusta!");
            return;
        }
        if (newProduct.price < 1) {
            toast.error("Cena produktu musi być wyższa lub równa 1 PLN!");
            return;
        }
        if (newProduct.color === "") {
            toast.error("Kolor produktu nie może być pusty!");
            return;
        }
        if (newProduct.size === "") {
            toast.error("Rozmiar produktu nie może być pusty!");
            return;
        }
        if (newProduct.brand === "") {
            toast.error("Marka produktu nie może być pusta!");
            return;
        }
        if (newProduct.img === "") {
            toast.error("Ścieżka do obrazka produktu nie może być pusta!");
            return;
        }
        const res = await axios.post("http://localhost:8080/products/add", newProduct, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        const addedProduct = res.data;
        setProducts([...products, addedProduct]);

        setNewProduct({
            productId: 0,
            name: "Nazwa produktu",
            price: 1,
            categoryId: 1,
            subcategoryId: 1,
            color: "Kolor",
            size: "Rozmiar",
            brand: "Marka",
            img: "Scieżka do obrazka"
        });

        navigate(0);
    }
    return (
        <div className="flex flex-col justify-center items-center w-full pb-12">
            <div className="mx-4 p-4 w-full h-fit">
                <div className="flex flex-row justify-center gap-10 text-4xl font-bold">
                    <FiArrowLeft size={40} onClick={handleReturnToUserView} className="inline-block cursor-pointer"/>
                    <h1 className="inline-block">Panel Administratora</h1>
                </div>
                <div className="flex flex-row gap-2 mt-8">
                    <h1 className="text-xl font-montserrat font-semibold">Kategorie (kolumna nr 3): </h1>
                    {categories.map((category, index) => (
                        <h1 className="text-xl font-montserrat font-semibold">{category.categoryId} - {category.name},</h1>
                    ))}
                </div>
                <div className="flex flex-row gap-2 mt-4">
                    <h1 className="text-xl font-montserrat font-semibold">Podkategorie (kolumna nr 4, 1-5 dla kategorii Sporty): </h1>
                    {subcategories.map((subcategory, index) => (
                        <h1 className="text-xl font-montserrat font-semibold">{subcategory.subcategoryId} - {subcategory.name},</h1>
                    ))}
                </div>
                <div className="flex flex-col gap-4 mt-4">
                    <div 
                        className="flex-row h-fit items-center">
                        <input
                            type="text"
                            value={newProduct.name} 
                            onChange={e => handleNewProductChange("name", e.target.value)}
                            className="w-72 p-2.5 mt-4 text-md font-montserrat font-semibold rounded-md border-2" 
                        />
                        <input 
                            type="number"
                            value={newProduct.price}
                            onChange={e => handleNewProductChange("price", parseFloat(e.target.value))}
                            className="w-24 ml-12 p-2.5 mt-4 text-md font-montserrat font-semibold rounded-md border-2 " />
                        <input 
                            type="number"
                            value={newProduct.categoryId}
                            onChange={e => {
                                const value = parseInt(e.target.value);
                                if (validateCategoryId(value)) {
                                    handleNewProductChange("categoryId", value);
                                }
                            }} 
                            className="w-16 mt-4 ml-12 p-2.5 text-md font-montserrat font-semibold rounded-md border-2"/>
                        <input 
                            type="number"
                            value={newProduct.subcategoryId}
                            onChange={e => {
                                const value = parseInt(e.target.value);
                                if (validateSubcategoryId(value, newProduct.categoryId)) {
                                    handleNewProductChange("subcategoryId", value);
                                }
                            }} 
                            className="w-16 mt-4 ml-12 p-2.5 text-md font-montserrat font-semibold rounded-md border-2"/>
                        <input 
                            type="text"
                            value={newProduct.color} 
                            onChange={e => handleNewProductChange("color", e.target.value)}
                            className="w-40 mt-4 ml-12 p-2.5 text-md font-montserrat font-semibold rounded-md border-2"
                        />
                        <input 
                            type="text"
                            value={newProduct.size}
                            onChange={e => handleNewProductChange("size", e.target.value)}
                            className="w-20 ml-12 p-2.5 mt-4 text-md font-montserrat font-semibold rounded-md border-2"
                        />
                        <input 
                            type="text"
                            value={newProduct.brand} 
                            onChange={e => handleNewProductChange("brand", e.target.value)}
                            className="w-36 ml-12 p-2.5 mt-4 text-md font-montserrat font-semibold rounded-md border-2"/>
                        <input 
                            type="text"
                            value={newProduct.img} 
                            onChange={e => handleNewProductChange("img", e.target.value)}
                            className="w-[510px] mt-4 ml-8 p-2.5 text-md font-montserrat font-semibold rounded-md border-2" 
                        />
                        <MdAdd className="inline-block ml-6 cursor-pointer active:scale-95" size={40} onClick={() => handleAddingProduct()}/>
                    </div>
                    {products.map((product, index) => (
                        <div
                            key={index}
                            className="flex-row h-fit items-center">
                            <input
                                type="text"
                                value={product.name}
                                onChange={(e) => handleProductChange(index, 'name', e.target.value)}
                                className="w-72 mt-4 p-2.5 text-md font-montserrat font-semibold border-2 rounded-md"/>
                            <input 
                                type="number"
                                value={product.price}
                                onChange={(e) => handleProductChange(index, 'price', parseFloat(e.target.value))}
                                className="w-24 ml-12 p-2.5 mt-4 text-md font-montserrat font-semibold border-2 rounded-md" />
                            <input 
                                type="number"
                                value={product.categoryId}
                                onChange={e => {
                                    const value = parseInt(e.target.value);
                                    if (validateCategoryId(value)) {
                                        handleProductChange(index, 'categoryId', parseInt(e.target.value));
                                    }
                                }}
                                className="w-16 ml-12 p-2.5 mt-4 text-md font-montserrat font-semibold border-2 rounded-md"/>
                            <input 
                                type="number"
                                value={product.subcategoryId}
                                onChange={e => {
                                    const value = parseInt(e.target.value);
                                    if (validateSubcategoryId(value, product.categoryId)) {
                                        handleProductChange(index, 'subcategoryId', parseInt(e.target.value));
                                    }
                                }}
                                className="w-16 mt-4 ml-12 p-2.5 text-md font-montserrat font-semibold border-2 rounded-md"/>
                            <input 
                                type="text"
                                value={product.color} 
                                onChange={(e) => handleProductChange(index, 'color', e.target.value)}
                                className="w-40 ml-12 mt-4 p-2.5 text-md font-montserrat font-semibold border-2 rounded-md"/>
                            <input 
                                type="text"
                                value={product.size} 
                                onChange={(e) => handleProductChange(index, 'size', e.target.value)}
                                className="w-20 ml-12 p-2.5 mt-4 text-md font-montserrat font-semibold border-2 rounded-md"/>
                            <input 
                                type="text"
                                value={product.brand} 
                                onChange={(e) => handleProductChange(index, 'brand', e.target.value)}
                                className="w-36 ml-12 p-2.5 mt-4 text-md font-montserrat font-semibold border-2 rounded-md"/>
                            <input 
                                type="text"
                                value={product.img} 
                                onChange={(e) => handleProductChange(index, 'img', e.target.value)}
                                className="w-[510px] mt-4 p-2.5 ml-8 text-md font-montserrat font-semibold border-2 rounded-md" />
                            <FiSave className="inline-block ml-6 cursor-pointer active:scale-95" size={40} onClick={() => handleUpdatingProduct(product.productId)}/>
                            <FiTrash className="inline-block ml-6 cursor-pointer active:scale-95" size={40} onClick={() => handleDeletingProduct(product.productId)}/>
                        </div>
                    ))}
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
        </div>
    );
}

export default AdminPanel;