import { useState } from "react";
import { Link } from "react-router-dom";

interface DropdownItem {
    path: string,
    label: string
}

interface DropdownProps {
    title: string,
    items: DropdownItem[]
}

const Dropdown = (props: DropdownProps) => {
    
    const { title, items } = props;
    let timeout: NodeJS.Timeout;
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    
    const handleMouseEnter = () => {
        clearTimeout(timeout);
        setIsDropdownVisible(true);
    };

    const handleMouseLeave = () => {
        timeout = setTimeout(() => setIsDropdownVisible(false), 200);
    };
    
    return (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="relative">
            <span className="text-2xl font-montserrat font-semibold hover:text-orange-600 cursor-pointer">
                {title} 
            </span>
            {isDropdownVisible && (
                <div className="absolute z-20 w-48 mt-2.5 bg-white border rounded-md shadow-lg text-2xl font-montserrat">
                    {items.map((item, index) => (
                        <Link 
                            to={item.path} 
                            key={index} 
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                        >
                            {item.label}    
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dropdown;