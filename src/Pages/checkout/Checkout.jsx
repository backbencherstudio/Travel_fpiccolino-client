import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
// import StripeForm from './StripeForm'; // Stripe Form Component
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
// import './Checkout.css';
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

    if (checkoutNewData) {
        console.log({checkoutNewData});
    }

    const [paymentMethod, setPaymentMethod] = useState('stripe');

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };

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
                        <StripeForm />
                    </Elements>
                ) : (
                    <PayPalScriptProvider
                        options={{
                            "client-id": "YOUR_PAYPAL_CLIENT_ID_HERE",
                            currency: 'USD',
                        }}
                    >
                        <PayPalButtons
                            createOrder={(data, actions) => {
                                return actions.order.create({
                                    purchase_units: [
                                        {
                                            amount: {
                                                value: '10.00', // Example Amount
                                            },
                                        },
                                    ],
                                });
                            }}
                            onApprove={(data, actions) => {
                                return actions.order.capture().then((details) => {
                                    alert('Payment Approved: ' + details.payer.name.given_name);
                                });
                            }}
                            onError={(err) => {
                                console.error('PayPal Error:', err);
                            }}
                        />
                    </PayPalScriptProvider>
                )}
            </div>
        </div>
    );
};

export default Checkout;
