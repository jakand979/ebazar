import { useState } from "react";
import Categories from "../components/Categories";
import Filters from "../components/Filters";
import Navbar from "../components/Navbar";
import Products from "../components/Products";

interface CategoryProps {
    categoryId: number,
    subcategoryId: number
}

const Category = (props: CategoryProps) => {
    const {categoryId, subcategoryId} = props;
    const apiPath = "/" + categoryId + "/" + subcategoryId;
    
    const [filters, setFilters] = useState({});

    const handleFilterChange = (newFilters: any) => {
        setFilters(newFilters);
    };
    
    return (
        <>
            <Navbar />
            <Categories />
            <div className="flex flex-row">
                <Filters apiPath={apiPath} onFilterChange={handleFilterChange} />
                <Products apiPath={apiPath} filters={filters} />
            </div>
        </>
    );
};

export default Category;