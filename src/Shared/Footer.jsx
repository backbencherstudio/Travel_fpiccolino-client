import { useEffect, useState } from "react";
import ParentComponent from "../Shared/ParentComponent/ParentComponent";
import stripe from "../assets/payment/stripe.svg";
import visa from "../assets/payment/visa.svg";
import paypal from "../assets/payment/paypal.svg";
import epay from "../assets/payment/epay.svg";
import call from "../assets/icons/call.svg";
import mail from "../assets/icons/mail.svg";
import klarna from "../assets/payment/download.png";
import { base_url } from "../utils/base_path";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getHomePageData } from "../features/pageData/pageDataSlice";
import { Link } from "react-router-dom";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const { homePageData } = useSelector((state) => state.pageData);

  useEffect(() => {
    dispatch(getHomePageData());
  }, [dispatch]);

  const footerData = homePageData?.footer?.[0] || {}; // Default to an empty object to prevent errors
  const contactInfo = footerData.contactInfo || {}; // Default to an empty object for contact info

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        toast.success("Thank you for subscribing! We'll be in touch soon.");
        setEmail("");
        setIsAgreed(false);
        setMessage("");
      } else {
        setMessage("Something went wrong. Please try again.");
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.log(error);
      setMessage("Error connecting to the server. Please try again.");
      toast.error("Error connecting to the server. Please try again.");
    }
  };

  return (
    <div className="bg-white text-black">
      <ParentComponent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-20 pb-10 lg:gap-0 gap-10">
          <div>
            {/* <img src={logo} alt="Logo" className=" h-52" /> */}
            <img
              src={`${base_url}/${footerData?.logoImg}`}
              alt=""
              className="w-[150px] h-[100px] rounded-lg"
            />
          </div>
          <div className="flex justify-between">
            <div className="text-[18px] font-medium">
              <h1 className="text-[20px] font-medium mb-6">Quick Link</h1>
              <Link to="/about">
                <p>La nostra Filosofia</p>
              </Link>
              <Link to="/tours">
                <p>l Nostri Viaggi</p>
              </Link>
              <Link to="/blog">
                <p>ll Blog LowCost</p>
              </Link>
              <Link to="/faq">
                <p>FAQ</p>
              </Link>
              <Link to="/contact">
                <p>Supporto Live</p>
              </Link>
              <Link to="/policy">
                <p>Termini e condizioni</p>
              </Link>
            </div>
            <div className="text-[16px] font-normal max-w-[218px]">
              <h1 className="text-[20px] font-medium mb-6">Contattaci</h1>
              <p>{"We're"} Here to Help with Any Questions or Concerns</p>
              <p className="flex gap-1 mt-4">
                <img src={call} alt="Call Icon" /> {contactInfo.phone || "N/A"}
              </p>
              <p className="flex gap-1 mt-2">
                <img src={mail} alt="Mail Icon" /> {contactInfo.email || "N/A"}
              </p>
            </div>
          </div>
          <div className="flex lg:justify-end">
            <div>
              <h1 className="text-[20px] font-medium w-[330px]">Newsletter</h1>

              <form className="relative mt-4" onSubmit={handleSubmit}>
                <input
                  className="p-3 pr-20 w-[327px] h-11 border border-[#626262] rounded-lg"
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
                  <p>Accetto tutti i termini e le condizioni</p>
                </div>
              </form>

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
              Copyright {footerData?.copyright || "N/A"}
            </p>
            <div className="flex gap-2">
              <img
                className="bg-white h-7 w-9 rounded"
                src={klarna}
                alt="Epay"
              />
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
