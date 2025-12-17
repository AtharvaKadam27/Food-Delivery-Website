import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./PlaceOrder.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const { getTotalCartAmount, setCartItems, token, food_list, cartItems, url } =
    useContext(StoreContext);

  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
    payment: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log(name, value);
    setData((data) => ({ ...data, [name]: value }));
  };
  console.log(data);

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    let response = await axios.post(url + "/api/order/place", orderData, {
      headers: { token },
    });

    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      toast.error("Error");
    }
  };

  const directOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    let response = await axios.post(url + "/api/order/direct", orderData, {
      headers: { token },
    });

    if (response.data.success) {
      navigate("/myorders");
      setCartItems({});
    } else {
      toast.error("Error");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (data.payment === "Cash on Delivery") {
      directOrder(e);
    } else {
      placeOrder(e);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/cart");
      toast.error("Login");
    } else if (getTotalCartAmount() === 0) {
      toast.error("Please Add some food in Cart");
      navigate("/cart");
    }
  }, [token]);

  return (
    <form onSubmit={handleSubmit} className="place-order">
      <div className="place-oredr-left">
        <p className="title">Delivery Information</p>
        <div className="multi-field">
          <input
            required
            type="text"
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            placeholder="First Name"
          />
          <input
            required
            type="text"
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            placeholder="Last Name"
          />
        </div>
        <input
          required
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          type="emailt"
          placeholder="Email address"
        />
        <input
          required
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          type="text"
          placeholder="street"
        />

        <div className="multi-field">
          <input
            required
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            type="text"
            placeholder="City"
          />
          <input
            required
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            type="text"
            placeholder="State"
          />
        </div>

        <div className="multi-field">
          <input
            required
            name="zipcode"
            onChange={onChangeHandler}
            value={data.zipcode}
            type="text"
            placeholder="Zip code"
          />
          <input
            required
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            type="text"
            placeholder="Country"
          />
        </div>

        <input
          required
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          type="text"
          placeholder="Phone number"
        />
      </div>

      <div className="palce-order-right">
        <div className="cart-total">
          <h2>Cart totals</h2>

          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </b>
            </div>
            <div className="cart-payment">
              <h2>Choose a Payment Method:</h2>
              <br />

              <select
                name="payment"
                onChange={onChangeHandler}
                value={data.payment}
              >
                <option value="Online Payment">Online Payement</option>
                <option value="Cash on Delivery">Cash on Delivery</option>
              </select>
            </div>
          </div>
          {data.payment === "Cash on Delivery" ? (
            <button>Cash On Delivery</button>
          ) : (
            <button type="submit">Proceed To Payment</button>
          )}
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
