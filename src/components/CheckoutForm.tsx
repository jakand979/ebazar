import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { StripeCardElementOptions } from '@stripe/stripe-js';
import axios from "axios";

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const location = useLocation();
    const navigate = useNavigate();
    const userData = localStorage.getItem("user");
    const user = userData ? JSON.parse(userData) : null;
    
    const cardStyle: StripeCardElementOptions = {
        style: {
            base: {
                color: "#32325d",
                fontFamily: 'Arial, sans-serif',
                fontSmoothing: "antialiased",
                fontSize: "18px",
                "::placeholder": {
                    color: "#aab7c4"
                }
            },
            invalid: {
                color: "#fa755a",
                iconColor: "#fa755a"
            }
        }
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);

        if (!cardElement) return;

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement,
        })

        if (!error) {
            const { id } = paymentMethod;
            const chargeRequest = {
                amount: location.state.total * 100,
                currency: "pln",
                id: id,
                userId: user.userId,
                items: location.state.items,
            }
            const res = await axios.post("http://localhost:8080/payment/charge", chargeRequest, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            
            if (res.data.success) {
                navigate("/orders");
            }        
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-lg p-6 bg-white border border-gray-300 rounded-lg shadow-lg">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-2xl font-semibold mb-2">Informacje o karcie</label>
                        <CardElement options={cardStyle} className="p-3 border border-gray-300 rounded-lg" />
                    </div>
                    <button 
                        type="submit"
                        className="w-full h-12 mt-4 bg-orange-700 text-white text-lg font-semibold rounded-lg hover:bg-orange-600 transition duration-300"
                    >
                        Zapłać {location.state.total} PLN
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CheckoutForm;