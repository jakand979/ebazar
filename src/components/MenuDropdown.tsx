import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

interface DropdownItem {
    path: string,
    label: string
}

interface DropdownProp {
    items: DropdownItem[]
}

const MenuDropdown = (prop: DropdownProp) => {
    const {items} = prop;
    const [isDropdownVisible, setIsDropdownVisible] = useState(true);
    const navigate = useNavigate();

    const handleItemClick = (item: DropdownItem) => {
        if (item.path === "/") {
            localStorage.removeItem("user");
            setIsDropdownVisible(false);
            navigate("/");
        } else {
            navigate(item.path);
        }
    };
    
    return (
        <div className="relative">
            {isDropdownVisible && 
                <div className="absolute z-40 w-48 mt-2.5 bg-white border rounded-md shadow-lg text-2xl font-montserrat">
                    {items.map((item, index) => (
                        <Link 
                            onClick={() => handleItemClick(item)} 
                            to={item.path} 
                            key={index} 
                            className="block py-2 px-4 text-gray-800 hover:bg-gray-200"
                        >
                            {item.label}    
                        </Link>
                    ))}
                </div>
            }
        </div>
    );
};

export default MenuDropdown;