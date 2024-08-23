import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Favourites from "./routes/Favourites";
import Basket from "./routes/Basket";
import ShopPolicy from "./routes/ShopPolicy";
import PrivacyPolicy from "./routes/PrivacyPolicy";
import Profile from "./routes/Profile";
import Category from "./routes/Category";
import Search from "./routes/Search";
import AdminPanel from "./routes/AdminPanel";
import OrderReview from "./routes/OrderReview";
import Payment from "./components/Payment";
import Orders from "./routes/Orders";

const categoriesRoutes = [
  { path: "/sports/football", element: <Category categoryId={1} subcategoryId={1}/> },
  { path: "/sports/volleyball", element: <Category categoryId={1} subcategoryId={2}/> },
  { path: "/sports/running", element: <Category categoryId={1} subcategoryId={3} /> },
  { path: "/sports/basketball", element: <Category categoryId={1} subcategoryId={4} /> },
  { path: "/sports/dart", element: <Category categoryId={1} subcategoryId={5} /> },
  { path: "/women/shirts", element: <Category categoryId={2} subcategoryId={6} /> },
  { path: "/women/trousers", element: <Category categoryId={2} subcategoryId={7} /> },
  { path: "/women/shorts", element: <Category categoryId={2} subcategoryId={8} /> },
  { path: "/women/jackets", element: <Category categoryId={2} subcategoryId={9} /> },
  { path: "/women/shoes", element: <Category categoryId={2} subcategoryId={10} /> },
  { path: "/men/shirts", element: <Category categoryId={3} subcategoryId={6} /> },
  { path: "/men/trousers", element: <Category categoryId={3} subcategoryId={7} /> },
  { path: "/men/shorts", element: <Category categoryId={3} subcategoryId={8} /> },
  { path: "/men/jackets", element: <Category categoryId={3} subcategoryId={9} /> }, 
  { path: "/men/shoes", element: <Category categoryId={3} subcategoryId={10} /> },
  { path: "/kids/shirts", element: <Category categoryId={4} subcategoryId={6} /> },
  { path: "/kids/trousers", element: <Category categoryId={4} subcategoryId={7} /> },
  { path: "/kids/shorts", element: <Category categoryId={4} subcategoryId={8} /> }, 
  { path: "/kids/jackets", element: <Category categoryId={4} subcategoryId={9} /> },
  { path: "/kids/shoes", element: <Category categoryId={4} subcategoryId={10} /> }
];

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/favourites" element={<Favourites />}></Route>
        <Route path="/basket" element={<Basket />}></Route>
        <Route path="/shop-policy" element={<ShopPolicy />}></Route>
        <Route path="/privacy-policy" element={<PrivacyPolicy />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        {categoriesRoutes.map((item, index) => (
          <Route path={item.path} key={index} element={item.element}></Route>
        ))}
        <Route path="/search" element={<Search />}></Route>
        <Route path="/admin-panel" element={<AdminPanel />}></Route>
        <Route path="/order-review" element={<OrderReview />}></Route>
        <Route path="/payment" element={<Payment />}></Route>
        <Route path="/orders" element={<Orders />}></Route>
      </Routes>
    </BrowserRouter>
    
  );
};

export default App;
