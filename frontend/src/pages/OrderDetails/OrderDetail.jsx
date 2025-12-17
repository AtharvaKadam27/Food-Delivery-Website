import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./OrderDetail.css";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../asset/assets";
import FoodItem from "../../components/FoodItem/FoodItem";

const OrderDetail = () => {
  const { cartItems, addToCart, removeFromCart, food_list, url } =
    useContext(StoreContext);

  const navigate = useNavigate();

  const params = useParams();

  const relatedfilteredFood = food_list.filter(
    (item) => item.category === params.category && item._id !== params.id
  );

  function proceedToCheckout(id) {
    addToCart(id);
    navigate("/cart");
  }

  return (
    <div className="foodDetails">
      <div className="ContainerDetails">
        {food_list.map((item) => {
          if (item._id === params.id) {
            return (
              <div key={item._id} className="foodDetailContainer">
                <div className="image">
                  <img src={url + "/images/" + item.image} alt="" />
                </div>
                <div className="description">
                  <h2>{item.name}</h2>
                  <div className="price">
                    <span>MRP:${item.price + 5}</span>
                    <p>MRP:${item.price}</p>
                  </div>
                  <p className="desc">{item.description}</p>
                  <div className="detail-counter">
                    {!cartItems[item._id] ? (
                      <button
                        className="proceed"
                        onClick={() => addToCart(item._id)}
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <div className="food-item-detail-counter">
                        <img
                          onClick={() => removeFromCart(item._id)}
                          src={assets.remove_icon_red}
                          alt=""
                        />
                        <p>{cartItems[item._id]}</p>
                        <img
                          onClick={() => addToCart(item._id)}
                          src={assets.add_icon_green}
                          alt=""
                        />
                      </div>
                    )}
                    <button
                      onClick={() => proceedToCheckout(item._id)}
                      className="proceed"
                    >
                      Order now
                    </button>
                  </div>
                </div>
              </div>
            );
          }
        })}

        <div className="related-food">
          <h1>Related food</h1>
          <div className="related-food-item">
            {relatedfilteredFood.map((item, index) => (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
                category={item.category}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
