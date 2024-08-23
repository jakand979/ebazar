const Brands = () => {
    return (
        <div className="w-[92.5vw] h-auto mx-12 mt-12">
            <h1 className="text-5xl font-montserrat font-bold">Najpopularniejsze marki</h1>
            <div className="flex justify-between items-center gap-12 w-full h-28 mt-14">
                <img src="images/logo/nike_logo.png" className="h-full object-contain" />
                <img src="images/logo/adidas_logo.png" className="h-full object-contain" />
                <img src="images/logo/new_balance_logo.jpg" className="h-full object-contain" />
                <img src="images/logo/vans_logo.png" className="h-full object-contain" />
                <img src="images/logo/puma_logo.png" className="h-full object-contain" />
                <img src="images/logo/fila_logo.jpg" className="h-full object-contain " />
            </div>
        </div>
    );
};

export default Brands;