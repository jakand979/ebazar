import { useEffect, useState, ChangeEvent } from "react";
import axios from "axios";

interface FiltersProps {
    apiPath: string,
    onFilterChange: (filters: any) => void;
}

const Filters = (props: FiltersProps) => {
    const {apiPath, onFilterChange} = props;
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [inputMinPrice, setInputMinPrice] = useState(0);
    const [inputMaxPrice, setInputMaxPrice] = useState(0);
    const [distinctSizes, setDistinctSizes] = useState([]);
    const [distinctColors, setDistinctColors] = useState([]);
    const [distinctBrands, setDistinctBrands] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const encodedSizes = selectedSizes.map(size => encodeURIComponent(size)).join(",");
    const encodedColors = selectedColors.map(color => encodeURIComponent(color)).join(",");
    const encodedBrands = selectedBrands.map(brand => encodeURIComponent(brand)).join(",");

    useEffect(() => {
        const fetchMinMaxPrice = async() => {
            const res = await axios.get("http://localhost:8080/products/minmax" + apiPath, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            setMinPrice(res.data.minPrice);
            setMaxPrice(res.data.maxPrice);
            setInputMinPrice(res.data.minPrice);
            setInputMaxPrice(res.data.maxPrice);
        };
        
        fetchMinMaxPrice();
    }, [apiPath]);

    useEffect(() => {
        const fetchDistinctSizes = async() => {
            if (inputMinPrice === 0 && inputMaxPrice === 0) return;
            
            const res = await axios.get("http://localhost:8080/products/distinctsizes" + apiPath, {
                headers: {
                    "Content-Type": "application/json"
                },
                params: {
                    minPrice: inputMinPrice,
                    maxPrice: inputMaxPrice
                }
            });

            setDistinctSizes(res.data);
        };

        fetchDistinctSizes();
    }, [apiPath, inputMinPrice, inputMaxPrice]);

    useEffect(() => {
        const fetchDistinctColors = async() => {
            if (inputMinPrice === 0 && inputMaxPrice === 0) return;

            const res = await axios.get("http://localhost:8080/products/distinctcolors" + apiPath, {
                headers: {
                    "Content-Type": "application/json"
                },
                params: {
                    minPrice: inputMinPrice,
                    maxPrice: inputMaxPrice
                }
            });
            
            setDistinctColors(res.data);
        };

        fetchDistinctColors();
    }, [apiPath, inputMinPrice, inputMaxPrice]);

    useEffect(() => {
        const fetchDistinctBrands = async() => {
            if (inputMinPrice === 0 && inputMaxPrice === 0) return;

            const res = await axios.get("http://localhost:8080/products/distinctbrands" + apiPath, {
                headers: {
                    "Content-Type": "application/json"
                },
                params: {
                    minPrice: inputMinPrice,
                    maxPrice: inputMaxPrice
                }
            });
            
            setDistinctBrands(res.data);
        };

        fetchDistinctBrands();
    }, [apiPath, inputMinPrice, inputMaxPrice]);

    const handleFilterChange = () => {
        onFilterChange({
            minPrice: inputMinPrice,
            maxPrice: inputMaxPrice,
            sizes: encodedSizes === "" ? null : encodedSizes,
            colors: encodedColors === "" ? null : encodedColors,
            brands: encodedBrands === "" ? null : encodedBrands
        });
    };

    const handleInputMinPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputMinPrice(Number(e.target.value));
    };

    const handleInputMaxPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputMaxPrice(Number(e.target.value));
    };

    const resetSelected = () => {
        setSelectedSizes([]);
        setSelectedColors([]);
        setSelectedBrands([]);
    };

    const validateMinPrice = () => {
        if (inputMinPrice < minPrice) {
            setInputMinPrice(minPrice);
            resetSelected();
        } else if (inputMinPrice > inputMaxPrice) {
            setInputMinPrice(inputMaxPrice);
            resetSelected();
        } else {
            resetSelected();
        }
    };

    const validateMaxPrice = () => {
        if (inputMaxPrice > maxPrice) {
            setInputMaxPrice(maxPrice);
            resetSelected();
        } else if (inputMaxPrice < inputMinPrice) {
            setInputMaxPrice(inputMinPrice);
            resetSelected();
        } else {
            resetSelected();
        }
    };

    useEffect(() => {
        handleFilterChange();
    }, [inputMinPrice, inputMaxPrice, encodedSizes, encodedColors, encodedBrands]);

    return (
        <div className="flex flex-col w-1/5 h-fit ml-16 mt-16 mb-8 pt-4 pb-8 border-2">
            <h1 className="ml-6 text-4xl font-montserrat font-semibold ">Filtry</h1>
            <hr className="mt-6" />
            <div className="flex flex-col ml-6 mt-6">
                <h1 className="text-3xl font-montserrat font-semibold">Cena</h1>
                <div className="flex flex-row items-center mt-4">
                <label htmlFor="from" className="text-2xl font-montserrat font-semibold">Od</label>
                <label htmlFor="to" className="ml-36 text-2xl font-montserrat font-semibold">Do</label>
                </div>
                <div className="flex items-center gap-8">
                    <input 
                        type="number" 
                        name="from" 
                        value={inputMinPrice} 
                        onChange={handleInputMinPriceChange}
                        onBlur={validateMinPrice}
                        className="w-36 h-12 mt-4 p-2.5 border-4 rounded-lg outline-none text-xl font-montserrat font-medium" 
                    />
                    <input 
                        type="number" 
                        name="to" 
                        value={inputMaxPrice} 
                        onChange={handleInputMaxPriceChange}
                        onBlur={validateMaxPrice}
                        className="w-36 h-12 mt-4 p-2.5 border-4 rounded-lg outline-none text-xl font-montserrat font-medium" 
                    />
                </div>
                <h1 className="mr-auto mt-6 text-2xl">{minPrice}-{maxPrice} PLN</h1>
            </div>
            <hr className="mt-6" />
            <div className="flex flex-col ml-6 mt-6">
                <h1 className="text-3xl font-montserrat font-semibold">Rozmiar</h1>
                <div className="flex flex-row flex-wrap items-center mt-4">
                    {distinctSizes.map((size, index) => (
                        <div 
                            key={index}
                            onClick={() => {
                                const isSelected = selectedSizes.includes(size);
                                setSelectedSizes(isSelected ? selectedSizes.filter(s => s !== size) : [...selectedSizes, size]);
                            }} 
                            className={`flex justify-center items-center w-20 h-11 border-2 text-xl font-montserrat font-medium  hover:border-slate-700 cursor-pointer 
                            ${selectedSizes.includes(size) ? "bg-orange-700 text-white" : "bg-white text-black"}`}
                        >
                            {size}
                        </div>
                    ))}
                </div>
            </div>
            <hr className="mt-6" />
            <div className="flex flex-col ml-6 mt-6">
                <h1 className="text-3xl font-montserrat font-semibold">Kolor</h1>
                {distinctColors.map((color, index) => (
                    <div key={index} className="flex items-center mt-4">
                        <input 
                            type="checkbox" 
                            name="color" 
                            onChange={() => {
                                const isSelected = selectedColors.includes(color);
                                setSelectedColors(isSelected ? selectedColors.filter(c => c !== color) : [...selectedColors, color]);
                            }}
                            className="w-6 h-6 accent-orange-600" 
                        />
                        <label htmlFor="color" className="inline-block ml-4 text-2xl font-montserrat font-medium">{color}</label>
                    </div>
                ))}   
            </div>
            <hr className="mt-6" />
            <div className="flex flex-col ml-6 mt-6">
                <h1 className="text-3xl font-montserrat font-semibold">Marka</h1>
                {distinctBrands.map((brand, index) => (
                    <div key={index} className="flex items-center mt-4">
                        <input 
                            type="checkbox" 
                            name="brand"
                            onChange={() => {
                                const isSelected = selectedBrands.includes(brand);
                                setSelectedBrands(isSelected ? selectedBrands.filter(c => c !== brand) : [...selectedBrands, brand]);
                            }}
                            className="w-6 h-6 accent-orange-600" 
                        />
                        <label htmlFor="brand" className="inline-block ml-4 text-2xl font-montserrat font-medium">{brand}</label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Filters;
