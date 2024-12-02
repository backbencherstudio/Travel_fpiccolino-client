import React from "react";
import logo from "../assets/logo.svg";
import ParentComponent from "../Shared/ParentComponent/ParentComponent";
import stripe from "../assets/payment/stripe.png";
import visa from "../assets/payment/visa.png";
import paypal from "../assets/payment/paypal.png";
import epay from "../assets/payment/epay.png";

const Footer = () => {
  return (
    <div className="bg-black text-white text-[]">
      <ParentComponent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-20 pb-10 lg:gap-0 gap-10">
          <div>
            <img src={logo} alt="" />
          </div>
          <div className="flex justify-between">
            <div className="text-[18px] font-medium">
              <h1 className="text-[20px] font-medium mb-6">Quick Link</h1>
              <p>About</p>
              <p>Tour</p>
              <p>Blog</p>
              <p>FAQ</p>
              <p>Contact</p>
            </div>
            <div className="text-[16px] font-normal max-w-[218px]">
              <h1 className="text-[20px] font-medium mb-6">Contact Us</h1>
              <p>We're Here to Help with Any Questions or Concerns</p>
              <p>012-3456-7899</p>
              <p>latuafuga@gmail.com</p>
            </div>
          </div>
          <div className="flex lg:justify-end">
            <h1 className="text-[20px] font-medium w-[330px] ">Newsletter </h1>
          </div>
        </div>
      </ParentComponent>
      <div className="border-t">
        <ParentComponent>
          <div className="flex justify-between py-6">
            <p className="text-[16px] ">
              Copyright © 2024 LA TUA FUGA LOWCOST . All rights reserved.
            </p>
            <div className="flex gap-2">
              <img src={stripe} className="w-9 h-7" alt="" />
              <img src={visa} alt="" className="w-9 h-7" />
              <img className="bg-white h-7 w-9 rounded-md" src={paypal} alt="" />
              <img className="bg-white h-7 w-9 rounded-md" src={epay} alt="" />
            </div>
          </div>
        </ParentComponent>
      </div>
    </div>
  );
};

export default Footer;
