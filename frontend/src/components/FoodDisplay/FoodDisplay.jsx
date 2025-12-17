import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import "./FoodDisplay.css";
import { assets } from "../../asset/assets";

const FoodDisplay = ({ category, setCategory }) => {
  const { food_list } = useContext(StoreContext);

  const filteredFood = food_list.filter(
    (item) =>
      category === "All" ||
      category === item.category ||
      item.name.toLowerCase().includes(category.toLowerCase())
  );

  return (
    <div className="food-display" id="food-display">
      <div className="food-display-header">
        <h2>Top dishes near to you</h2>
        <div className="food-display-searchbar">
          <input
            onChange={(e) => setCategory(e.target.value)}
            type="text"
            placeholder="Search your favorite dish..."
          />
          <img src={assets.search_icon} alt="" />
        </div>
      </div>
      {filteredFood.length > 0 ? (
        <div className="food-display-list">
          {filteredFood.map((item, index) => (
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
      ) : (
        <div className="no-match-found">Oops! , No match found.</div>
      )}
    </div>
  );
};

export default FoodDisplay;
