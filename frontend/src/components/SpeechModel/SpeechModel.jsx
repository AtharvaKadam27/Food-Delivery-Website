import React, { useEffect, useState } from "react";
import "./SpeechModel.css";
import { assets } from "../../asset/assets";

const SpeechModel = () => {
  const [show, setShow] = useState(false);
  const [help, setHelp] = useState(false);
  const [speech, setSpeech] = useState("");
  let recognition = new webkitSpeechRecognition();
  recognition.onresult = (e) => {
    setSpeech(e.results[0][0].transcript);
  };

  let speechArr = [
    "Add Greek Salad to cart",
    "Remove Veg Rolls from cart",
    "proceed to checkout",
    "Show my orders",
    "Show Cart",
  ];

  function navigateSpeech() {
    if (!speech.trim().length) {
      return;
    }
    const regex = /^(?:Add|Remove)\s+(.+?)\s+to cart$/i;

    const match = speech.match(regex);

    if (match) {
      console.log("Item:", match[1]);
    }
  }

  useEffect(() => {
    navigateSpeech();
    console.log("hey");

    return () => {};
  }, [speech]);

  function handleSpeech() {
    setShow(!show);
    setHelp(!help);

    recognition.start();
  }

  return (
    <div className="model">
      <div className="container">
        {show &&
          (help ? (
            <div className="toggle-box">
              <button onClick={() => setHelp(false)}>i</button>
              <div className="example-text">
                Speak : <span>"Show Cart"</span>
              </div>
            </div>
          ) : (
            <div className="toggle-box" style={{ top: "-60px" }}>
              <div className="example-text">
                <p>Things You Can Ask Me:</p>
                <p>Add "Food name" to cart</p>
                <p>Remove "Food name" from cart</p>
                <p>proceed to checkout</p>
                <p>Show my orders</p>
                <p>Show Cart</p>
              </div>
              <button onClick={() => setHelp(true)}>X</button>
            </div>
          ))}
      </div>
      <img onClick={handleSpeech} src={assets.ai_assistant} alt="" />
    </div>
  );
};

export default SpeechModel;
