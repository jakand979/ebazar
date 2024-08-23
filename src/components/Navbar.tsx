import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import MenuDropdown from "./MenuDropdown";
import { FiSearch, FiUser, FiHeart, FiShoppingCart } from "react-icons/fi";

const Navbar = () => {
    const user = localStorage.getItem("user");
    const userData = user ? JSON.parse(user) : null;
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const [searchText, setSearchText] = useState("");

    const handleUserClick = () => {
        if (user === null) {
            navigate("/login");
        } else {
            setShowDropdown(prev => !prev);
        }
    };

    const dropdownItems = [
        { path: "/profile", label: "Profil" },
        { path: "/orders", label: "Historia zamówień" },
        { path: "/", label: "Wyloguj się" }
    ];

    const adminDropdownItems = [
        { path: "/admin-panel", label: "Panel admina"},
        { path: "/profile", label: "Profil" },
        { path: "/orders", label: "Historia zamówień" },
        { path: "/", label: "Wyloguj się" }
    ];

    const handleSearchClick = () => {
        if (userData) navigate("/search", { state: { searchText } });
    };
    
    return (
        <div className="flex justify-between items-center w-screen mt-8 px-8">
            <Link to="/" className="mx-8"><h1 className="text-5xl font-montserrat font-extrabold italic">e-bazar</h1></Link>
            <div className="relative flex w-1/3 ml-20">
                <input 
                    type="text" 
                    placeholder="Czego szukasz?"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="w-full h-14 p-2.5 border-4 rounded-md outline-none border-gray-400 text-xl font-montserrat font-medium"
                />
                <FiSearch size={36} onClick={handleSearchClick} className="absolute right-3 top-2.5 cursor-pointer" />
            </div>
            <div className="flex justify-between w-60 mx-12">
                <div className="relative">
                    <FiUser size={48} onClick={handleUserClick} className="cursor-pointer" />
                    {showDropdown && userData !== null && <MenuDropdown items={userData.role === "admin" ? adminDropdownItems : dropdownItems} />}
                </div>
                <FiHeart size={48} onClick={userData ? () => navigate("/favourites") : () => {}} className="cursor-pointer" />
                <FiShoppingCart size={48} onClick={userData ? () => navigate("/basket") : () => {}} className="cursor-pointer" />
            </div>
        </div>
    );
};

export default Navbar;