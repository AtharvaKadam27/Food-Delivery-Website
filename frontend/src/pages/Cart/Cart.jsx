import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import { assets } from "../../asset/assets";

const Cart = () => {
  const { cartItems, removeFromCart, url, food_list, getTotalCartAmount } =
    useContext(StoreContext);
  const navigate = useNavigate();

  if (getTotalCartAmount()) {
    return (
      <div className="cart">
        <div className="cart-items">
          <div className="cart-item-title">
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <hr />
          <br />

          {food_list.map((item, index) => {
            if (cartItems[item._id] > 0) {
              return (
                <div className="cart-items-item" key={item._id}>
                  <img src={url + "/images/" + item.image} alt={item.name} />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p className="cross" onClick={() => removeFromCart(item._id)}>
                    x
                  </p>
                </div>
              );
            }
          })}
        </div>
        <hr />
        <div className="card-bottom">
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
            </div>
            <button onClick={() => navigate("/order")}>
              Proceed To Checkout
            </button>
          </div>
          <div className="cart-promocode">
            <div>
              <p>If you have a promo code,Enter it here</p>
              <div className="cart-promocode-input">
                <input type="text" placeholder="Promo Code" />
                <button>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="cart-empty">
        <img src={assets.empty_cart} alt="" />
        <h1>Your Cart is Empty !</h1>
        <p>Must add items on the cart before you procees to check out</p>
      </div>
    );
  }
};

export default Cart;
