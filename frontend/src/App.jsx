import { Routes, Route } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import Navbar from "./components/Navbar/Navbar.jsx";
import Home from "./pages/Home/Home.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder.jsx";
import Footer from "./components/Footer/Footer.jsx";
import LoginPopUp from "./components/LoginPopUp/LoginPopUp.jsx";
import Verify from "./pages/verify/Verify.jsx";
import MyOrders from "./pages/MyOrders/MyOrders.jsx";
import OrderDetail from "./pages/OrderDetails/OrderDetail.jsx";
import SpeechModel from "./components/SpeechModel/SpeechModel.jsx";

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin ? <LoginPopUp setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/details/:category/:id" element={<OrderDetail />} />
        </Routes>
      </div>
      <SpeechModel />
      <Footer />
    </>
  );
}

export default App;
