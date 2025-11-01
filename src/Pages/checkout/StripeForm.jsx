/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { createOrder } from "../../features/order/orderSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import EditableHeading from "../../Components/Common/EditableHeading";
import { base_url } from "../../utils/base_path";
import { IoIosCard } from "react-icons/io";
import klarna from "../../assets/payment/klarna.jpeg";

const StripeForm = ({ checkoutNewData }) => {
  const [isCard, setIsCard] = useState(true);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const dispatch = useDispatch();

  const showError = (message) => {
    setError(message);
    setTimeout(() => {
      setError("");
    }, 10000); // 10 seconds
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      // 1) Create PaymentIntent on server and get clientSecret
      const { data } = await axios.post(`${base_url}/order/stripePayment`, {
        amount: Number(checkoutNewData?.toureAmount || 0),
        email,
      });
      if (!data?.clientSecret) {
        throw new Error("Failed to initialize payment");
      }

      // 2) Confirm card payment on client (handles 3DS/SCA)
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: { email },
        },
      });

      if (result.error) {
        showError(result.error.message || "Payment failed.");
        setLoading(false);
        return;
      }

      if (result.paymentIntent?.status === "succeeded") {
        const orderData = {
          ...checkoutNewData,
          paymentId: result.paymentIntent.id,
          email, // ensure backend can email guests
        };
        await dispatch(createOrder(orderData));
        setSuccess(true);
        setShowSuccessModal(true);
      } else {
        showError("Payment was not successful.");
      }
    } catch (err) {
      showError(err?.response?.data?.error || err.message || "Payment failed.");
    }
    setLoading(false);
  };

  const elementStyle = {
    style: {
      base: {
        fontSize: "16px",
        color: "#32325d",
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        "::placeholder": {
          color: "#aab7c4",
        },
        padding: "10px",
      },
      invalid: {
        color: "#fa755a",
      },
    },
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg px-3 max-w-lg mx-auto"
    >
      <h2 className="text-2xl font-bold text-center mb-2">
        <EditableHeading
          titleKey="checkout.securePayment"
          defaultTitle="Secure Payment"
          customTitleClass="text-2xl font-bold text-center mb-2"
        />
      </h2>

      <div className="mb-2">
        <label
          className="block text-lg font-semibold mb-2 text-gray-700"
          htmlFor="email"
        >
          <EditableHeading
            titleKey="checkout.email"
            defaultTitle="Email"
            customTitleClass="text-lg font-semibold mb-2 text-gray-700"
          />
        </label>
        <input
          type="email"
          id="email"
          className="w-full p-3 border rounded-lg focus:ring-blue-500 focus:outline-none"
          placeholder="inserisci la tua email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-3 mb-2">
        <button
          onClick={() => setIsCard(true)}
          className={`border text-start p-1 px-2 rounded-lg text-sm ${
            isCard ? "border-orange-500" : ""
          }`}
        >
          <IoIosCard size={20} />
          <p>Card</p>
        </button>
        <button
          onClick={() => setIsCard(false)}
          className={`border text-start p-1 px-2 rounded-lg text-sm ${
            isCard ? "" : "border-orange-500"
          }`}
        >
          <img src={klarna} width={20} height={20} alt="" />
          <p>Klarna</p>
        </button>
      </div>
      {!isCard && (
        <div className="mb-2">
          <label
            className="block text-lg font-semibold mb-2 text-gray-700"
            htmlFor="name"
          >
            <EditableHeading
              titleKey="checkout.name"
              defaultTitle="Name"
              customTitleClass="text-lg font-semibold mb-2 text-gray-700"
            />
          </label>
          <input
            type="name"
            id="name"
            className="w-full p-3 border rounded-lg focus:ring-blue-500 focus:outline-none"
            placeholder="inserisci la tua nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
      )}
      <div className="mb-2">
        <label className="block text-lg font-semibold mb-2 text-gray-700">
          <EditableHeading
            titleKey="checkout.cardNumber"
            defaultTitle="Card Number"
            customTitleClass="text-lg font-semibold mb-2 text-gray-700"
          />
        </label>
        <div className="p-3 border rounded-lg bg-gray-50">
          <CardNumberElement options={elementStyle} />
        </div>
      </div>

      <div className="flex gap-4 mb-2">
        <div className="w-1/2">
          <label className="block text-lg font-semibold mb-2 text-gray-700">
            <EditableHeading
              titleKey="checkout.expirationDate"
              defaultTitle="Expiration Date"
              customTitleClass="text-lg font-semibold mb-2 text-gray-700"
            />
          </label>
          <div className="p-3 border rounded-lg bg-gray-50">
            <CardExpiryElement options={elementStyle} />
          </div>
        </div>
        <div className="w-1/2">
          <label className="block text-lg font-semibold mb-2 text-gray-700">
            <EditableHeading
              titleKey="checkout.cvc"
              defaultTitle="CVC"
              customTitleClass="text-lg font-semibold mb-2 text-gray-700"
            />
          </label>
          <div className="p-3 border rounded-lg bg-gray-50">
            <CardCvcElement options={elementStyle} />
          </div>
        </div>
      </div>
      <button
        type="submit"
        disabled={!stripe || loading}
        className={`w-full mt-6 py-3 text-white font-bold rounded-lg ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-orange-600 hover:opacity-90"
        }`}
      >
        {loading
          ? "Processing..."
          : `Pay Now : ${checkoutNewData?.toureAmount || 0} €`}
      </button>

      {error && (
        <div className="mt-8 text-gray-700 font-medium text-center flex justify-between items-center p-3 bg-red-100 border  rounded-lg shadow-md">
          <span className="flex-1">
            Please ensure your card number is entered correctly.
          </span>
          <button
            onClick={() => setError("")}
            className="ml-4 text-red-600 text-2xl p-2   hover:bg-red-100 focus:outline-none transform scale-150 transition-all duration-200"
          >
            &times;
          </button>
        </div>
      )}

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-md w-full mx-4">
            <div className="text-center">
              <svg
                className="mx-auto h-16 w-16 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <h3 className="text-2xl font-bold text-gray-900 mt-4">
                Payment Successful!
              </h3>
              <div className="mt-4">
                <p className="text-gray-600">
                  Thank you for your payment of {checkoutNewData?.toureAmount || 0} €.
                </p>
                <p className="text-gray-600 mt-2">
                  Your booking confirmation has been sent to {email}.
                </p>
              </div>
              <div className="mt-8">
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    navigate("/");
                  }}
                  className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </form>
  );
};

export default StripeForm;