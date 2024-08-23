import { useEffect, useState } from "react";
import { Product } from "./Products";
import axios from "axios";

interface OrderItem {
    id: number, 
    product: Product
    quantity: number
}

interface Order {
    orderId: number,
    userId: number,
    total: number,
    items: OrderItem[],
    paymentId: string,
    createdAt: Date,
    status: string
}

const OrdersHistory = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const userData = localStorage.getItem("user");
    const user = userData ? JSON.parse(userData) : null;

    useEffect(() => {
        const fetchOrders = async (userId: number) => {
            const res = await axios.get("http://localhost:8080/orders/" + userId, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log(res.data);
            setOrders(res.data);
        };

        fetchOrders(user.userId);
    }, [user.userId]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    };

    return (
        <div className="flex flex-col justify-center items-center w-full mt-20 pb-12">
            <h1 className="text-5xl font-montserrat font-bold">Zamówienia</h1>
            {orders.length === 0 ? (<h1 className="mt-12 text-4xl mr-auto ml-auto font-montserrat font-bold">Brak zamówień.</h1>) : ""}
            {orders.map((order, index) => (
                <div key={index} className="mt-8 p-4 border-2 w-fit">
                    <h2 className="mt-4 text-3xl font-montserrat font-bold">Zamówienie nr {order.orderId}</h2>
                    <p className="mt-4 text-2xl font-montserrat font-semibold">Data i czas zamówienia: {formatDate(order.createdAt.toString())}</p>
                    <p className="mt-4 text-2xl font-montserrat font-semibold">Identyfikator płatności: {order.paymentId}</p>
                    <p className="mt-4 text-2xl font-montserrat font-semibold">Status: 
                        <h1 className="inline-block ml-1 text-2xl font-montserrat font-semibold text-orange-700">{order.status}</h1>
                    </p>
                    <p className="mt-4 text-2xl font-montserrat font-semibold">Łączna kwota: 
                        <h1 className="inline-block ml-1 text-2xl font-montserrat font-semibold text-orange-700">{order.total} PLN</h1>
                    </p>
                    <h3 className="mt-4 text-2xl font-montserrat font-semibold">Produkty:</h3>
                    {order.items.map((orderItem, index) => (
                        <div key={index} className="ml-4 mt-4">
                            
                            <p className="text-xl font-montserrat font-bold"><img src={orderItem.product.img} alt={`product-${index}`} className="inline-block w-[150px] h-[150px] scale-75 object-contain"/>{orderItem.product.name} x {orderItem.quantity}</p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default OrdersHistory;