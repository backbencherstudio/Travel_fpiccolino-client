import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import StripeForm from "./StripeForm";
import { useDispatch, useSelector } from "react-redux";
import { getCheckoutNewData } from "../../features/checkout/checkoutSlice";
import { createOrder } from "../../features/order/orderSlice";
import Footer from "../../Shared/Footer";
import { GoChevronLeft } from "react-icons/go";
import ParentComponent from "../../Shared/ParentComponent/ParentComponent";
import { Link } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51QFpATLEvlBZD5dJaha6mJPocvY5x6EoeWDg3DVjMIFdAwRzxN6sNlimMO6xW3hk3a7STUMQtVi6vb2NWu1Vc46c000l8Y7yha"
);

const Checkout = () => {
  const { checkoutNewData } = useSelector((state) => state.checkout);
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState("stripe");

  useEffect(() => {
    dispatch(getCheckoutNewData());
  }, [dispatch]);

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const getPaypalSuccessDataFun = async (data) => {
    const orderData = {
      ...checkoutNewData,
      paymentId: data.id,
    };

    if (orderData) {
      const res = await dispatch(createOrder(orderData));
      console.log(res);
    }
  };

  const amount = checkoutNewData?.toureAmount
    ? parseFloat(checkoutNewData?.toureAmount).toFixed(2)
    : "0.00";

  return (
    <div>
      <ParentComponent>
        <Link to={`/personalDetails`} className="flex items-center mt-20">
          <GoChevronLeft className="text-xl" /> Back to Tour Details
        </Link>

        <div className="my-20 flex items-center justify-center">
          <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left Section - Order Summary */}
              <div className="primary_bg p-8 text-white">
                <h1 className="text-3xl font-semibold mb-6">Order Summary</h1>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-white pb-4">
                    <span className="text-white">Amount Due</span>
                    <span className="text-2xl">${amount}</span>
                  </div>
                  <div className="pt-4">
                    <p className="text-sm text-white">
                      Secure Payment Processing
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Section - Payment Form */}
              <div className="p-8">
                <div className="mb-6">
                  <div className="flex space-x-4 mb-6">
                    <button
                      onClick={() => handlePaymentMethodChange("stripe")}
                      className={`flex-1 py-2 px-4 rounded-lg transition-all duration-200 ${
                        paymentMethod === "stripe"
                          ? "bg-orange-600 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      Credit Card
                    </button>
                    <button
                      onClick={() => handlePaymentMethodChange("paypal")}
                      className={`flex-1 py-2 px-4 rounded-lg transition-all duration-200 ${
                        paymentMethod === "paypal"
                          ? "bg-orange-600 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      PayPal
                    </button>
                  </div>

                  <div className="h-96 overflow-y-auto">
                    {paymentMethod === "stripe" ? (
                      <Elements stripe={stripePromise}>
                        <StripeForm checkoutNewData={checkoutNewData} />
                      </Elements>
                    ) : (
                      <PayPalScriptProvider
                        options={{
                          "client-id":
                            "AUHCLLlrN0fUteHTIYiBX7ZOoduVvF0mp4QSDUQOf_m2GohS_kVr6z8CbTJgOMnGNyMAiLsx_EWf8l5C",
                          currency: "USD",
                          "disable-funding": "paylater",
                        }}
                      >
                        <PayPalButtons
                          style={{
                            layout: "vertical",
                            color: "blue",
                            shape: "rect",
                            label: "checkout",
                            height: 45,
                          }}
                          createOrder={(data, actions) => {
                            if (!amount || parseFloat(amount) <= 0) {
                              alert("Invalid payment amount");
                              return;
                            }
                            return actions.order.create({
                              purchase_units: [
                                {
                                  amount: {
                                    value: amount,
                                  },
                                },
                              ],
                            });
                          }}
                          onApprove={(data, actions) => {
                            return actions.order.capture().then((details) => {
                              getPaypalSuccessDataFun(details);
                              alert(
                                "Payment Approved: " +
                                  details.payer.name.given_name
                              );
                            });
                          }}
                          onError={(err) => {
                            console.error("PayPal Error:", err);
                          }}
                          forceReRender={[amount]}
                        />
                      </PayPalScriptProvider>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ParentComponent>
      <Footer />
    </div>
  );
};

export default Checkout;
