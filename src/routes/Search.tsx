import { useState } from "react";
import { useLocation } from "react-router-dom";
import Categories from "../components/Categories";
import Navbar from "../components/Navbar";
import SearchFilters from "../components/SearchFilters";
import SearchResults from "../components/SearchResults";

const Search = () => {
    const location = useLocation();
    const searchText = location.state || "";
    const [filters, setFilters] = useState({});
    
    const handleFilterChange = (newFilters: any) => {
        setFilters(newFilters);
        console.log(filters)
    };

    return (
        <>
            <Navbar />
            <Categories />
            <div className="flex flex-row">
                <SearchFilters searchText={searchText.searchText} onFilterChange={handleFilterChange} />
                <SearchResults searchText={searchText.searchText} filters={filters}/>
            </div>
        </>
    );
};

export default Search;