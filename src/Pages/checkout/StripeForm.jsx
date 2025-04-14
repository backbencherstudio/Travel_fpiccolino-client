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
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const cardElement = elements.getElement(CardNumberElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        email,
      },
    });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    try {
      const { data } = await axios.post(`${base_url}/order/stripePayment`, {
        paymentMethodId: paymentMethod.id,
        amount: parseInt(checkoutNewData?.toureAmount),
      });
      const orderData = {
        ...checkoutNewData,
        paymentId: data?.paymentIntent.id,
      };
      if (orderData) {
        const res = await dispatch(createOrder(orderData));
        console.log(res);
      }

      if (data.success) {
        setSuccess(true);
        alert("Payment successful!");
        navigate("/");
      }
    } catch (err) {
      setError("Payment failed.");
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
          : `Pay Now : ${checkoutNewData?.toureAmount} €`}
      </button>

      {error && (
        <div className="mt-4 text-red-500 font-medium text-center">{error}</div>
      )}
      {success && (
        <div className="mt-4 text-green-500 font-medium text-center">
          Payment Successful!
        </div>
      )}
    </form>
  );
};

export default StripeForm;
