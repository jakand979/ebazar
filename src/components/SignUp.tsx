import { useRef, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
    const firstName = useRef<string>("");
    const lastName = useRef<string>("");
    const email = useRef<string>("");
    const phoneNumber = useRef<string>("");
    const password = useRef<string>("");
    const navigation = useNavigate();

    const handleSubmitRegister = async(e: FormEvent) => {
        e.preventDefault();    
        
        const userData = {
            firstName: firstName.current, 
            lastName: lastName.current, 
            email: email.current, 
            phoneNumber: phoneNumber.current,
            password: password.current
        };

        const res = await axios.post("http://localhost:8080/users/create", userData, { 
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (res.status === 200) {
            navigation("/login");
        }
    };

    return (
        <div className="flex flex-col items-center w-screen h-auto mx-0 mt-20 pb-20 text-center"> 
            <h1 className="text-4xl font-montserrat font-semibold">Rejestracja</h1>
            <form id="signup" onSubmit={handleSubmitRegister} className="flex flex-col items-center w-full">
                <input 
                    type="text" 
                    className="w-1/4 h-14 mt-10 p-2.5 border-4 rounded-md outline-none border-gray-400 text-lg font-montserrat font-medium" 
                    placeholder="Imię" 
                    onChange={(e) => firstName.current = e.target.value} 
                    required
                />
                <input 
                    type="text" 
                    className="w-1/4 h-14 mt-6 p-2.5 border-4 rounded-md outline-none border-gray-400 text-lg font-montserrat font-medium" 
                    placeholder="Nazwisko"
                    onChange={(e) => lastName.current = e.target.value} 
                    required
                />
                <input 
                    type="text" 
                    className="w-1/4 h-14 mt-6 p-2.5 border-4 rounded-md outline-none border-gray-400 text-lg font-montserrat font-medium" 
                    placeholder="Adres e-mail"
                    onChange={(e) => email.current = e.target.value} 
                    required
                />
                <input 
                    type="text" 
                    className="w-1/4 h-14 mt-6 p-2.5 border-4 rounded-md outline-none border-gray-400 text-lg font-montserrat font-medium" 
                    placeholder="Numer telefonu"
                    onChange={(e) => phoneNumber.current = e.target.value} 
                    required
                />
                <input 
                    type="password" 
                    className="w-1/4 h-14 mt-6 p-2.5 border-4 rounded-md outline-none border-gray-400 text-lg font-montserrat font-medium" 
                    placeholder="Hasło"
                    onChange={(e) => password.current = e.target.value} 
                    required
                />
                <button type="submit" className="w-1/4 h-14 mt-10 border-none rounded-md bg-orange-600 text-black text-2xl font-montserrat font-extrabold active:scale-95">Zarejestruj się</button>
            </form>
            <Link to="/login"><h1 className="mt-10 text-2xl hover:text-orange-600 cursor-pointer">Masz konto? <u>Zaloguj się</u></h1></Link>
        </div>
    );
};

export default SignUp;