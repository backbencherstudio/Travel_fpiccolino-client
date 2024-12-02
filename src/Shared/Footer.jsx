import React from "react";
import logo from "../assets/logo.svg";
import ParentComponent from "../Shared/ParentComponent/ParentComponent";
import stripe from "../assets/payment/stripe.svg";
import visa from "../assets/payment/visa.svg";
import paypal from "../assets/payment/paypal.svg";
import epay from "../assets/payment/epay.svg";

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
            <div>
              <h1 className="text-[20px] font-medium w-[330px] ">
                Newsletter{" "}
              </h1>

              <div className="relative mt-4">
                <input
                  className="bg-[#1f1f1f] p-3 pr-20 w-[327px] h-11 border border-[#626262] rounded-lg"
                  type="text"
                  placeholder="Your Email address"
                />
                <button className="primary_bg text-white absolute right-2 top-2 px-[10px] py-1 rounded-lg text-[14px]">
                  Send
                </button>
                <div className="flex gap-2 mt-3">
                  <input
                    className="w-[18px] h-[18px] mt-0.5 bg-transparent"
                    type="checkbox"
                  />{" "}
                  <p>I Agree To All Your Terms & condition</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ParentComponent>
      <div className="border-t">
        <ParentComponent>
          <div className="flex flex-col md:flex-row justify-between py-6 md:gap-0 gap-5">
            <p className="text-[16px] ">
              Copyright © 2024 LA TUA FUGA LOWCOST . All rights reserved.
            </p>
            <div className="flex gap-2">
              <img src={stripe} className="bg-white rounded w-9 h-7" alt="" />
              <img src={visa} alt="" className="bg-white rounded w-9 h-7" />
              <img className="bg-white h-7 w-9 rounded" src={paypal} alt="" />
              <img className="bg-white h-7 w-9 rounded" src={epay} alt="" />
            </div>
          </div>
        </ParentComponent>
      </div>
    </div>
  );
};

export default Footer;
