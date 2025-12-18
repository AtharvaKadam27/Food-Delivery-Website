import React from "react";
import "./Footer.css";
import { assets } from "../../asset/assets";

const Footer = () => {
  return (
    <div className="Footer">
      <div className="footer" id="footer">
        <div className="footer-content">
          <div className="footer-content-left">
            <img src={assets.logo} alt="" />
            <p>
              This is Tomato Food Ordering Website created by MCA-Div-A Students
              for the Subject E-commerce
            </p>
            <div className="footer-social-icon">
              <a href="https://facebook.com">
                <img src={assets.facebook_icon} alt="" />
              </a>
              {/* <img src={assets.twitter_icon} alt="" /> */}
              <a href="https://www.linkedin.com/school/sies-college-of-management-studies-india/">
                <img src={assets.linkedin_icon} alt="" />
              </a>
            </div>
          </div>
          <div className="footer-content-right">
            <h2>COMPANY</h2>
            <ul>
              <li>Home</li>
              <li>About Us</li>
              <li>Delivery</li>
              <li>Privacy policy</li>
            </ul>
          </div>
          <div className="footer-content-center">
            <h2>GET IN TOUCH</h2>
            <ul>
              <li>+91-9876543210</li>
              <li>contact@tomato.com</li>
            </ul>
          </div>
        </div>
        <hr />
        <p className="footer-copyright">
          Copyright 2025 © Tomato.com-All Right Reserved{" "}
        </p>
      </div>
    </div>
  );
};

export default Footer;
