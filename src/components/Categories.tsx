import Dropdown from "./Dropdown";

const Categories = () => {
    return (
        <div className="relative z-30 flex justify-around w-screen mt-12">
            <Dropdown 
                title="Sporty"
                items={[
                    { path: "/sports/football", label: "Piłka nożna" },
                    { path: "/sports/volleyball", label: "Siatkówka" },
                    { path: "/sports/running", label: "Bieganie" },
                    { path: "/sports/basketball", label: "Koszykówka" },
                    { path: "/sports/dart", label: "Dart" }
                ]} 
            />
            <Dropdown 
                title="Kobiety"
                items={[
                    { path: "/women/shirts", label: "Bluzki" },
                    { path: "/women/trousers", label: "Spodnie" },
                    { path: "/women/shorts", label: "Spodenki" },
                    { path: "/women/jackets", label: "Kurtki" },
                    { path: "/women/shoes", label: "Buty" }
                ]}
            />
            <Dropdown
                title="Mężczyźni"
                items={[
                    { path: "/men/shirts", label: "Bluzki" },
                    { path: "/men/trousers", label: "Spodnie" },
                    { path: "/men/shorts", label: "Spodenki" },
                    { path: "/men/jackets", label: "Kurtki" },
                    { path: "/men/shoes", label: "Buty" }
                ]}
            />
            <Dropdown
                title="Dzieci"
                items={[
                    { path: "/kids/shirts", label: "Bluzki" },
                    { path: "/kids/trousers", label: "Spodnie" },
                    { path: "/kids/shorts", label: "Spodenki" },
                    { path: "/kids/jackets", label: "Kurtki" },
                    { path: "/kids/shoes", label: "Buty" }
                ]}
            />
        </div>
    );
};

export default Categories;