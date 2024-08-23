import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const Payment = () => {
    const stripePromise = loadStripe("pk_test_51ObmnAISwy2ghL1IAMIE2S7HbqaO6KBmeME3R09lM55KMOZsb7cSMsDRe766D9PQYNHLV0fHOqEpCGZU6hNlPyEx00yunlYWME");
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    )
};

export default Payment;