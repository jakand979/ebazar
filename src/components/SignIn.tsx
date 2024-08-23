import { useRef, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
    const email = useRef<string>("");
    const password = useRef<string>("");
    const navigate = useNavigate();

    const handleLoginAttempt = async(e: FormEvent) => {
        e.preventDefault();

        const loginData = {
            email: email.current,
            password: password.current 
        };

        const res = await axios.post("http://localhost:8080/users/login", loginData, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (res.data !== "") {
            localStorage.setItem("user", JSON.stringify(res.data));
            navigate("/");
        } else {
            toast.error("Adres email i/lub hasło są niepoprawne!");
        }
    };

    return (
        <div className="flex flex-col items-center mt-20 text-center"> 
            <h1 className="text-4xl font-montserrat font-semibold">Logowanie</h1>
            <form id="signin" onSubmit={handleLoginAttempt} className="flex flex-col items-center w-full" >
                <input 
                    type="text" 
                    className="w-1/4 h-14 mt-10 p-2.5 border-4 rounded-md outline-none border-gray-400 text-lg font-montserrat font-medium" 
                    placeholder="Adres e-mail" 
                    onChange={(e) => email.current = e.target.value} 
                    required 
                />
                <input 
                    type="password" 
                    className="w-1/4 h-14 mt-6 p-2.5 border-4 rounded-md outline-none border-gray-400 text-lg font-montserrat font-medium" 
                    placeholder="Hasło" 
                    onChange={(e) => password.current = e.target.value} 
                    required 
                />
            </form>
            <button type="submit" form="signin" className="w-1/4 h-14 mt-10 border-none rounded-md bg-orange-600 text-black text-2xl font-montserrat font-extrabold active:scale-95">Zaloguj się</button>
            <Link to="/register"><h1 className="mt-10 text-2xl hover:text-orange-600 cursor-pointer">Nie masz konta? <u>Zarejestruj się</u></h1></Link>
            <ToastContainer
                className="text-2xl text-left"
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

export default SignIn;