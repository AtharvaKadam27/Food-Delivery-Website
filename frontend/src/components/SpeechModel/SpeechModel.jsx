import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./SpeechModel.css";
import { assets } from "../../asset/assets";
import { StoreContext } from "../../context/StoreContext";

const SpeechModel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Hi! I'm your food assistant. How can I help you today? You can ask me about your cart, get recommendations, or use voice commands!",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const {
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
  } = useContext(StoreContext);

  // Speech Recognition Setup
  const recognitionRef = useRef(null);

  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      recognitionRef.current = new webkitSpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (e) => {
        const transcript = e.results[0][0].transcript;
        handleUserMessage(transcript, true);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
        addBotMessage(
          "Sorry, I couldn't hear you. Please try again or type your message."
        );
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  // Auto scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addBotMessage = (text) => {
    setMessages((prev) => [...prev, { type: "bot", text }]);
  };

  const addUserMessage = (text) => {
    setMessages((prev) => [...prev, { type: "user", text }]);
  };

  // Get items currently in cart
  const getCartItems = () => {
    return food_list.filter((item) => cartItems[item._id] > 0);
  };

  // Get cart summary
  const getCartSummary = () => {
    const items = getCartItems();
    if (items.length === 0) {
      return "Your cart is empty.";
    }
    const itemList = items
      .map(
        (item) =>
          `${item.name} (x${cartItems[item._id]}) - $${
            item.price * cartItems[item._id]
          }`
      )
      .join("\n• ");
    const total = getTotalCartAmount();
    return `Your cart contains:\n• ${itemList}\n\nSubtotal: $${total}\nDelivery: $2\nTotal: $${
      total + 2
    }`;
  };

  // Find food item by name (fuzzy match)
  const findFoodByName = (name) => {
    const normalizedName = name.toLowerCase().trim();
    return food_list.find(
      (item) =>
        item.name.toLowerCase() === normalizedName ||
        item.name.toLowerCase().includes(normalizedName) ||
        normalizedName.includes(item.name.toLowerCase())
    );
  };

  // Get intelligent recommendations based on cart
  const getRecommendations = () => {
    const cartItemsList = getCartItems();

    if (cartItemsList.length === 0) {
      // Recommend popular items if cart is empty
      const popularItems = food_list.slice(0, 3);
      return `Since your cart is empty, here are some popular items to get started:\n• ${popularItems
        .map((i) => `${i.name} ($${i.price})`)
        .join("\n• ")}\n\nWould you like me to add any of these to your cart?`;
    }

    // Get categories in cart
    const cartCategories = [
      ...new Set(cartItemsList.map((item) => item.category)),
    ];

    // Find items from same categories not in cart
    const sameCategory = food_list.filter(
      (item) => cartCategories.includes(item.category) && !cartItems[item._id]
    );

    // Find complementary items from different categories
    const differentCategory = food_list.filter(
      (item) => !cartCategories.includes(item.category) && !cartItems[item._id]
    );

    let recommendations = [];

    // Add items from same category
    if (sameCategory.length > 0) {
      recommendations.push(
        `Based on your taste for ${cartCategories.join(
          ", "
        )}, you might also like:\n• ${sameCategory
          .slice(0, 2)
          .map((i) => `${i.name} ($${i.price})`)
          .join("\n• ")}`
      );
    }

    // Suggest complementary items
    if (differentCategory.length > 0) {
      const suggestion =
        differentCategory[
          Math.floor(Math.random() * Math.min(differentCategory.length, 5))
        ];
      recommendations.push(
        `To complete your meal, consider adding ${suggestion.name} from our ${suggestion.category} menu ($${suggestion.price}).`
      );
    }

    // If cart total is low, suggest more items
    const total = getTotalCartAmount();
    if (total < 20 && differentCategory.length > 0) {
      recommendations.push(
        `💡 Tip: Add $${20 - total} more to qualify for free delivery!`
      );
    }

    return recommendations.join("\n\n");
  };

  // Get items by category
  const getItemsByCategory = (category) => {
    const normalizedCategory = category.toLowerCase().trim();
    const items = food_list.filter(
      (item) => item.category.toLowerCase() === normalizedCategory
    );
    if (items.length === 0) {
      return `Sorry, I couldn't find items in the "${category}" category. Available categories are: Salad, Rolls, Deserts, Sandwich, Cake, Pure Veg, Pasta, Noodles.`;
    }
    return `Here are our ${category} items:\n• ${items
      .map((i) => `${i.name} ($${i.price})`)
      .join("\n• ")}\n\nWould you like me to add any to your cart?`;
  };

  // Process user message and generate response
  const processMessage = (message) => {
    const lowerMessage = message.toLowerCase().trim();

    // Add item to cart - handle multiple patterns:
    // "add Greek salad to cart", "add to cart Greek salad", "add Greek salad"
    if (lowerMessage.includes("add")) {
      let itemName = "";

      // Pattern 1: "add [item] to cart"
      const addPattern1 = lowerMessage.match(/add\s+(.+?)\s+to\s+cart/i);
      // Pattern 2: "add to cart [item]"
      const addPattern2 = lowerMessage.match(/add\s+to\s+cart\s+(.+)/i);
      // Pattern 3: "add [item]" (without "to cart")
      const addPattern3 = lowerMessage.match(/add\s+(.+)/i);

      if (addPattern1) {
        itemName = addPattern1[1];
      } else if (addPattern2) {
        itemName = addPattern2[1];
      } else if (addPattern3) {
        itemName = addPattern3[1].replace(/to\s*cart/gi, "").trim();
      }

      if (itemName) {
        const item = findFoodByName(itemName);
        if (item) {
          addToCart(item._id);
          return `✅ Added ${item.name} to your cart! Current quantity: ${
            (cartItems[item._id] || 0) + 1
          }\n\n${getRecommendations()}`;
        }
        return `Sorry, I couldn't find "${itemName}" in our menu. Try saying "Show menu" to see available items.`;
      }
    }

    // Remove item from cart - handle multiple patterns:
    // "remove Greek salad from cart", "remove from cart Greek salad", "remove Greek salad"
    if (lowerMessage.includes("remove")) {
      let itemName = "";

      // Pattern 1: "remove [item] from cart"
      const removePattern1 = lowerMessage.match(
        /remove\s+(.+?)\s+from\s+cart/i
      );
      // Pattern 2: "remove from cart [item]"
      const removePattern2 = lowerMessage.match(/remove\s+from\s+cart\s+(.+)/i);
      // Pattern 3: "remove [item]" (without "from cart")
      const removePattern3 = lowerMessage.match(/remove\s+(.+)/i);

      if (removePattern1) {
        itemName = removePattern1[1];
      } else if (removePattern2) {
        itemName = removePattern2[1];
      } else if (removePattern3) {
        itemName = removePattern3[1].replace(/from\s*cart/gi, "").trim();
      }

      if (itemName) {
        const item = findFoodByName(itemName);
        if (item) {
          if (cartItems[item._id] > 0) {
            removeFromCart(item._id);
            return `✅ Removed one ${item.name} from your cart.`;
          }
          return `${item.name} is not in your cart.`;
        }
        return `Sorry, I couldn't find "${itemName}" in our menu.`;
      }
    }

    // Show cart
    if (
      lowerMessage.includes("cart") ||
      lowerMessage.includes("basket") ||
      lowerMessage.includes("what's in my") ||
      lowerMessage.includes("show cart")
    ) {
      if (
        lowerMessage.includes("go to") ||
        lowerMessage.includes("open") ||
        lowerMessage.includes("show cart")
      ) {
        navigate("/cart");
        return "Opening your cart... 🛒";
      }
      return getCartSummary();
    }

    // Checkout / Place order
    if (
      lowerMessage.includes("checkout") ||
      lowerMessage.includes("place order") ||
      lowerMessage.includes("proceed")
    ) {
      if (getTotalCartAmount() === 0) {
        return "Your cart is empty! Add some items first before checking out.";
      }
      navigate("/order");
      return "Taking you to checkout... 💳";
    }

    // My orders
    if (
      lowerMessage.includes("my order") ||
      lowerMessage.includes("order history") ||
      lowerMessage.includes("orders")
    ) {
      navigate("/myorders");
      return "Here are your orders... 📦";
    }

    // Go home
    if (
      lowerMessage.includes("home") ||
      lowerMessage.includes("menu") ||
      lowerMessage.includes("go back")
    ) {
      navigate("/");
      return "Taking you to the home page... 🏠";
    }

    // Recommendations
    if (
      lowerMessage.includes("recommend") ||
      lowerMessage.includes("suggestion") ||
      lowerMessage.includes("what should i") ||
      lowerMessage.includes("help me choose")
    ) {
      return getRecommendations();
    }

    // Category search
    const categoryMatch = lowerMessage.match(/show\s+(.+?)(?:\s+items)?$/i);
    if (categoryMatch) {
      const category = categoryMatch[1];
      if (!["cart", "orders", "menu"].includes(category.toLowerCase())) {
        return getItemsByCategory(category);
      }
    }

    // Price inquiry
    const priceMatch = lowerMessage.match(/(?:price|cost|how much).*?(.+)/i);
    if (priceMatch) {
      const itemName = priceMatch[1].replace(/is|the|of|for/gi, "").trim();
      const item = findFoodByName(itemName);
      if (item) {
        return `${item.name} costs $${item.price}. Would you like me to add it to your cart?`;
      }
    }

    // Total inquiry
    if (lowerMessage.includes("total") || lowerMessage.includes("how much")) {
      const total = getTotalCartAmount();
      if (total === 0) {
        return "Your cart is empty. Browse our menu and add some delicious items!";
      }
      return `Your current cart total is $${total}. With $2 delivery, your order total would be $${
        total + 2
      }.`;
    }

    // Clear cart
    if (
      lowerMessage.includes("clear cart") ||
      lowerMessage.includes("empty cart")
    ) {
      const items = getCartItems();
      items.forEach((item) => {
        for (let i = 0; i < cartItems[item._id]; i++) {
          removeFromCart(item._id);
        }
      });
      return "✅ Your cart has been cleared.";
    }

    // Help
    if (lowerMessage.includes("help") || lowerMessage === "?") {
      return `Here's what I can help you with:

🛒 **Cart Commands:**
• "Show my cart" - View cart contents
• "Add [item name] to cart"
• "Remove [item name] from cart"
• "Clear cart"
• "What's my total?"

🍽️ **Browse Menu:**
• "Show Salads" (or any category)
• "Show menu" - Go to home page
• "How much is [item name]?"

💡 **Recommendations:**
• "What should I order?"

🚀 **Navigation:**
• "Go to checkout"
• "Show my orders"
• "Go home"

Just type or speak your request!`;
    }

    // Greeting
    if (
      lowerMessage.includes("hello") ||
      lowerMessage.includes("hi") ||
      lowerMessage.includes("hey")
    ) {
      return `Hello! 👋 Welcome to our food delivery service! ${
        getTotalCartAmount() > 0
          ? `You have ${
              getCartItems().length
            } item(s) in your cart worth $${getTotalCartAmount()}.`
          : "Your cart is empty. Would you like some recommendations?"
      }`;
    }

    // Thank you
    if (lowerMessage.includes("thank")) {
      return "You're welcome! 😊 Let me know if you need anything else.";
    }

    // Default response
    return `I'm not sure how to help with that. Try asking me to:
• Show your cart
• Add or remove items
• Navigate to checkout

Or type "help" for a full list of commands!`;
  };

  const handleUserMessage = (text, isVoice = false) => {
    if (!text.trim()) return;

    addUserMessage(isVoice ? `🎤 ${text}` : text);

    // Process the message and respond
    setTimeout(() => {
      const response = processMessage(text);
      addBotMessage(response);
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUserMessage(inputText);
    setInputText("");
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="ai-assistant">
      {isOpen && (
        <div className="chat-container">
          <div className="chat-header">
            <img src={assets.ai_assistant} alt="AI" className="header-avatar" />
            <div className="header-info">
              <h3>Food Assistant</h3>
              <span className="status">Online</span>
            </div>
            <button className="close-btn" onClick={toggleChat}>
              ×
            </button>
          </div>

          <div className="messages-container">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${
                  msg.type === "bot" ? "bot-message" : "user-message"
                }`}
              >
                {msg.type === "bot" && (
                  <img
                    src={assets.ai_assistant}
                    alt="Bot"
                    className="message-avatar"
                  />
                )}
                <div className="message-content">
                  <p style={{ whiteSpace: "pre-line" }}>{msg.text}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form className="input-container" onSubmit={handleSubmit}>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type a message or use voice..."
            />
            <button
              type="button"
              className={`voice-btn ${isListening ? "listening" : ""}`}
              onClick={startListening}
              title="Click to speak"
            >
              🎤
            </button>
            <button type="submit" className="send-btn">
              ➤
            </button>
          </form>

          {isListening && (
            <div className="listening-indicator">
              <div className="pulse-ring"></div>
              <span>Listening...</span>
            </div>
          )}
        </div>
      )}

      <div className="assistant-button" onClick={toggleChat}>
        <img src={assets.ai_assistant} alt="AI Assistant" />
        {!isOpen && <span className="notification-dot"></span>}
      </div>
    </div>
  );
};

export default SpeechModel;
