import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import StripeForm from './StripeForm';
import { useDispatch, useSelector } from 'react-redux';
import { getCheckoutNewData } from '../../features/checkout/checkoutSlice';

// Load Stripe Key
const stripePromise = loadStripe('pk_test_51QFpATLEvlBZD5dJaha6mJPocvY5x6EoeWDg3DVjMIFdAwRzxN6sNlimMO6xW3hk3a7STUMQtVi6vb2NWu1Vc46c000l8Y7yha');

const Checkout = () => {
    const { checkoutNewData } = useSelector((state) => state.checkout);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCheckoutNewData());
    }, [dispatch]);

    const [paymentMethod, setPaymentMethod] = useState('stripe');

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const getPaypalSuccessDataFun = (data) => {

        const orderData = {
            ...checkoutNewData,
            paymentId: data.id,
        };


        console.log('Paypal orderData Data:', orderData);
    };

    const amount = checkoutNewData?.toureAmount
        ? parseFloat(checkoutNewData?.toureAmount).toFixed(2)
        : "0.00";

    return (
        <div className="checkout-container">
            <h2>Checkout Page</h2>

            <div className="payment-method-dropdown">
                <label>Select Payment Method: </label>
                <select value={paymentMethod} onChange={handlePaymentMethodChange}>
                    <option value="stripe">Stripe</option>
                    <option value="paypal">PayPal</option>
                </select>
            </div>

            <div className="payment-form">
                {paymentMethod === 'stripe' ? (
                    <Elements stripe={stripePromise}>
                        <StripeForm checkoutNewData={checkoutNewData} />
                    </Elements>
                ) : (
                    <div className='bg-green-700 flex justify-center w-full'>
                        <div style={{ width: "600px" }}>
                            <PayPalScriptProvider
                                options={{
                                    "client-id": "AUHCLLlrN0fUteHTIYiBX7ZOoduVvF0mp4QSDUQOf_m2GohS_kVr6z8CbTJgOMnGNyMAiLsx_EWf8l5C",
                                    currency: 'USD',
                                    "disable-funding": "paylater", // Removes "Pay Later" option
                                }}
                            >
                                <PayPalButtons
                                    style={{
                                        layout: "vertical", // Change to "horizontal" for side-by-side buttons
                                        color: "blue",
                                        shape: "rect",
                                        label: "checkout",
                                        height: 50,
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
                                                        value: amount, // Dynamic Amount Passed
                                                    },
                                                },
                                            ],
                                        });
                                    }}
                                    onApprove={(data, actions) => {
                                        return actions.order.capture().then((details) => {
                                            getPaypalSuccessDataFun(details);
                                            alert('Payment Approved: ' + details.payer.name.given_name);
                                        });
                                    }}
                                    onError={(err) => {
                                        console.error('PayPal Error:', err);
                                    }}
                                    forceReRender={[amount]} // Forces re-render when the amount changes
                                />
                            </PayPalScriptProvider>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Checkout;
