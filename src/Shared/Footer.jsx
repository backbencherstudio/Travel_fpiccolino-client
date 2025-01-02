import React, { useEffect, useState } from "react";
import logo from "../assets/logo.svg";
import ParentComponent from "../Shared/ParentComponent/ParentComponent";
import stripe from "../assets/payment/stripe.svg";
import visa from "../assets/payment/visa.svg";
import paypal from "../assets/payment/paypal.svg";
import epay from "../assets/payment/epay.svg";
import call from "../assets/icons/call.svg";
import mail from "../assets/icons/mail.svg";
import { base_url } from "../utils/base_path";
import { toast } from "react-hot-toast"; // Importing the toast function
import { useDispatch, useSelector } from "react-redux";
import { getHomePageData } from "../features/pageData/pageDataSlice";
import { getHeader } from "../features/header/headerSlice";

const Footer = () => {
  // State for email input and checkbox
  const [email, setEmail] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  const [message, setMessage] = useState(""); // To display success or error message

  const dispatch = useDispatch()
  const { homePageLoaging, homePageError, homePageData } = useSelector(
    (state) => state.pageData
  );
  
  useEffect(() => {
    dispatch(getHomePageData())
  }, []);

  // const { headers } = useSelector((state) => state.header);
  // useEffect(() => {
  //   dispatch(getHeader());
  // }, []);

  // const data = headers?.filter(item => item.pageName === "home")
  // const heroContent = {
  //   heroImage: data[0]?.heroImage,
  //   titleOne: data[0]?.titleOne,
  //   descriptionOne: data[0]?.descriptionOne,
  // }


  // if (homePageData) {
  //   const contactInfo = homePageData?.footer;
  //   console.log(contactInfo);
  // }



  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the email is valid and the user has agreed to the terms
    if (!email || !isAgreed) {
      setMessage("Please provide a valid email and agree to the terms.");
      return;
    }

    try {
      const response = await fetch(`${base_url}/api/subscriber`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.status === 200 || response.status === 201) {
        // Success - Show success toast
        toast.success("Thank you for subscribing! We'll be in touch soon.");
        setEmail(""); // Clear the input field
        setIsAgreed(false); // Uncheck the checkbox
        setMessage(""); // Clear the message
      } else {
        setMessage("Something went wrong. Please try again.");
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      setMessage("Error connecting to the server. Please try again.");
      toast.error("Error connecting to the server. Please try again.");
    }
  };

  return (
    <div className="bg-black text-white">
      <ParentComponent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-20 pb-10 lg:gap-0 gap-10">
          <div>
            <img src={logo} alt="Logo" />
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
              <p>{"We're"} Here to Help with Any Questions or Concerns</p>
              <p className="flex gap-1 mt-4">
                <img src={call} alt="" /> +01010101010101
              </p>
              <p className="flex gap-1 mt-2">
                <img src={mail} alt="" /> cool@cool.com
              </p>
            </div>
          </div>
          <div className="flex lg:justify-end">
            <div>
              <h1 className="text-[20px] font-medium w-[330px]">Newsletter</h1>

              <form className="relative mt-4" onSubmit={handleSubmit}>
                <input
                  className="bg-[#1f1f1f] p-3 pr-20 w-[327px] h-11 border border-[#626262] rounded-lg"
                  type="email"
                  placeholder="Your Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="primary_bg text-white absolute right-2 top-2 px-[10px] py-1 rounded-lg text-[14px]"
                >
                  Send
                </button>
                <div className="flex gap-2 mt-3">
                  <input
                    className="w-[18px] h-[18px] mt-0.5 bg-transparent"
                    type="checkbox"
                    checked={isAgreed}
                    onChange={() => setIsAgreed(!isAgreed)}
                  />
                  <p>I Agree To All Your Terms & condition</p>
                </div>
              </form>

              {/* Display message */}
              {message && (
                <p className="text-sm text-red-400 mt-3">{message}</p>
              )}
            </div>
          </div>
        </div>
      </ParentComponent>
      <div className="border-t">
        <ParentComponent>
          <div className="flex flex-col md:flex-row justify-between py-6 md:gap-0 gap-5">
            <p className="text-[16px]">
              Copyright © 2024 LA TUA FUGA LOWCOST. All rights reserved.
            </p>
            <div className="flex gap-2">
              <img
                src={stripe}
                className="bg-white rounded w-9 h-7"
                alt="Stripe"
              />
              <img src={visa} alt="Visa" className="bg-white rounded w-9 h-7" />
              <img
                className="bg-white h-7 w-9 rounded"
                src={paypal}
                alt="PayPal"
              />
              <img className="bg-white h-7 w-9 rounded" src={epay} alt="Epay" />
            </div>
          </div>
        </ParentComponent>
      </div>
    </div>
  );
};

export default Footer;
