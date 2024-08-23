import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserProfile = () => {
    const userData = localStorage.getItem("user"); 
    const user = userData ? JSON.parse(userData) : null;
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [email, setEmail] = useState(user.email);
    const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
    const [newPassword, setNewPassword] = useState("");
    const [street, setStreet] = useState("");
    const [houseNumber, setHouseNumber] = useState("");
    const [flatNumber, setFlatNumber] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [city, setCity] = useState("");

    useEffect(() => {
        const fetchAddress = async() => {
            const userId = user.userId;
            const res = await axios.get("http://localhost:8080/addresses/getaddress/" + userId, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            setStreet(res.data.street);
            setHouseNumber(res.data.houseNumber);
            setFlatNumber(res.data.flatNumber);
            setPostalCode(res.data.postalCode);
            setCity(res.data.city);
        };
        
        fetchAddress();
    }, [user.userId]);
   
    const handleInputChange = (setter: React.Dispatch<any>) => (event: ChangeEvent<HTMLInputElement>) => {
        setter(event.target.value);
    };

    const handleUpdatingUserData = async(e: FormEvent) => {
        e.preventDefault();
        
        const userData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
        };

        const res = await axios.put("http://localhost:8080/users/update/" + user.userId, userData, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        localStorage.setItem("user", JSON.stringify(res.data));
        
        toast.success("Dane osobowe zaktualizowane pomyślnie!");
    };

    const handlePasswordChange = async(e: FormEvent) => {
        e.preventDefault();

        const passwordData = {
            password: newPassword,
        };
        
        
        const res = await axios.put("http://localhost:8080/users/password/" + user.userId, passwordData, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        
        if (res.data === "") {
            toast.error("Nowe hasło nie może być takie samo jak obecne!");
            return;
        }

        localStorage.setItem("user", JSON.stringify(res.data));
        toast.success("Hasło zmienione pomyślnie!");
        setNewPassword("");
    };

    const handleUpdatingAddress = async(e: FormEvent) => {
        e.preventDefault();

        const addressData = {
            street: street,
            houseNumber: houseNumber,
            flatNumber: flatNumber,
            postalCode: postalCode,
            city: city,
            userId: user.userId
        };

        const res = await axios.put("http://localhost:8080/addresses/update/" + user.userId, addressData, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        
        setStreet(res.data.street);
        setHouseNumber(res.data.homeNumber);
        setFlatNumber(res.data.flatNumber);
        setPostalCode(res.data.postalCode);
        setCity(res.data.city);

        toast.success("Adres zaktualizowany pomyślnie!");
    };

    return (
        <div className="flex flex-col items-center gap-20 w-screen mx-4 mt-20">
            <form className="flex flex-col w-1/3" onSubmit={handleUpdatingUserData}>
                <h1 className="w-fit text-4xl font-montserrat font-semibold">Twoje dane:</h1>
                <div className="flex items-center w-full mt-8">
                    <label htmlFor="firstName" className="inline-block text-2xl font-montserrat font-medium">Imię:</label>
                    <input 
                        type="text" 
                        name="firstName" 
                        value={firstName} 
                        onChange={handleInputChange(setFirstName)} 
                        className="flex-grow h-10 ml-4 p-2.5 border-4 rounded-md outline-none border-gray-400 text-2xl font-montserrat font-medium" 
                        required
                    />
                </div>
                <div className="flex items-center w-full mt-6">
                    <label htmlFor="lastName" className="inline-block text-2xl font-montserrat font-medium">Nazwisko:</label>
                    <input 
                        type="text" 
                        name="lastName" 
                        value={lastName} 
                        onChange={handleInputChange(setLastName)} 
                        className="flex-grow h-10 ml-4 p-2.5 border-4 rounded-md outline-none border-gray-400 text-2xl font-montserrat font-medium"
                        required
                    />
                </div>
                <div className="flex items-center w-full mt-6">
                    <label htmlFor="email" className="inline-block text-2xl font-montserrat font-medium">Email:</label>
                    <input 
                        type="text" 
                        name="email" 
                        value={email} 
                        onChange={handleInputChange(setEmail)} 
                        className="flex-grow h-10 ml-4 p-2.5 border-4 rounded-md outline-none border-gray-400 text-2xl font-montserrat font-medium"
                        required
                    />
                </div>
                <div className="flex items-center w-full mt-6">
                    <label htmlFor="phoneNumber" className="inline-block text-2xl font-montserrat font-medium">Telefon:</label>
                    <input 
                        type="text" 
                        name="email" 
                        value={phoneNumber} 
                        onChange={handleInputChange(setPhoneNumber)} 
                        className="flex-grow h-10 ml-4 p-2.5 border-4 rounded-md outline-none border-gray-400 text-2xl font-montserrat font-medium"
                        required
                    />
                </div>
                <button type="submit" className="w-full h-14 mt-10 border-none rounded-md bg-orange-600 text-black text-2xl font-montserrat font-extrabold active:scale-95">Zaktualizuj dane</button>
            </form>
            <form className="flex flex-col w-1/3" onSubmit={handlePasswordChange}>
                <h1 className="w-fit text-4xl font-montserrat font-semibold">Zmień hasło:</h1>
                <div className="flex items-center w-full mt-8">
                    <label htmlFor="currentPassword" className="inline-block text-2xl font-montserrat font-medium">Nowe hasło:</label>
                    <input 
                        type="password" 
                        name="newPassword" 
                        value={newPassword} 
                        onChange={handleInputChange(setNewPassword)} 
                        className="flex-grow h-10 ml-4 p-2.5 border-4 rounded-md outline-none border-gray-400 text-2xl font-montserrat font-medium" 
                        required
                    />
                </div>
                <button type="submit" className="w-full h-14 mt-10 border-none rounded-md bg-orange-600 text-black text-2xl font-montserrat font-extrabold active:scale-95">Zmień hasło</button>
            </form>
            <form className="flex flex-col w-1/3" onSubmit={handleUpdatingAddress}>
                <h1 className="w-fit text-4xl font-montserrat font-semibold">Twój adres:</h1>
                <div className="flex items-center w-full mt-8">
                    <label htmlFor="street" className="inline-block text-2xl font-montserrat font-medium">Ulica:</label>
                    <input
                        type="text"
                        name="street"
                        value={street}
                        onChange={handleInputChange(setStreet)}
                        className="flex-grow h-10 ml-4 p-2.5 border-4 rounded-md outline-none border-gray-400 text-2xl font-montserrat font-medium"     
                        required
                    />
                </div>
                <div className="flex items-center w-full mt-8">
                    <label htmlFor="street" className="inline-block text-2xl font-montserrat font-medium">Numer domu:</label>
                    <input
                        type="text"
                        name="homeNumber"
                        value={houseNumber}
                        onChange={handleInputChange(setHouseNumber)}
                        className="flex-grow h-10 ml-4 p-2.5 border-4 rounded-md outline-none border-gray-400 text-2xl font-montserrat font-medium"     
                        required
                    />
                </div>
                <div className="flex items-center w-full mt-8">
                    <label htmlFor="street" className="inline-block text-2xl font-montserrat font-medium">Numer mieszkania:</label>
                    <input
                        type="text"
                        name="flatNumber"
                        value={flatNumber}
                        onChange={handleInputChange(setFlatNumber)}
                        className="flex-grow h-10 ml-4 p-2.5 border-4 rounded-md outline-none border-gray-400 text-2xl font-montserrat font-medium"     
                    />
                </div>
                <div className="flex items-center w-full mt-8">
                    <label htmlFor="street" className="inline-block text-2xl font-montserrat font-medium">Kod pocztowy:</label>
                    <input
                        type="text"
                        name="postalCode"
                        value={postalCode}
                        onChange={handleInputChange(setPostalCode)}
                        className="flex-grow h-10 ml-4 p-2.5 border-4 rounded-md outline-none border-gray-400 text-2xl font-montserrat font-medium"     
                        required
                    />
                </div>
                <div className="flex items-center w-full mt-8">
                    <label htmlFor="city" className="inline-block text-2xl font-montserrat font-medium">Miejscowość:</label>
                    <input
                        type="text"
                        name="city"
                        value={city}
                        onChange={handleInputChange(setCity)}
                        className="flex-grow h-10 ml-4 p-2.5 border-4 rounded-md outline-none border-gray-400 text-2xl font-montserrat font-medium"     
                        required
                    />
                </div>
                <button 
                    type="submit" 
                    className="w-full h-14 mx-auto mt-10 border-none rounded-md bg-orange-600 text-black text-2xl font-montserrat font-extrabold active:scale-95">
                    Zapisz
                </button>      
            </form>
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
    );
};

export default UserProfile;