import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const StripeForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
            return;
        }

        try {
            const { data } = await axios.post('http://localhost:3000/order/stripePayment', {
                paymentMethodId: paymentMethod.id,
                amount: 50, // Example amount (10.00 USD)
            });

            console.log(data);
            

            if (data.success) {
                setSuccess(true);
                alert('Payment successful!');
            }
        } catch (err) {
            setError('Payment failed.');
        }

        setLoading(false);
    };

    const cardElementStyle = {
        style: {
            base: {
                fontSize: '18px',
                color: '#32325d',
                fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                '::placeholder': {
                    color: '#a0aec0',
                },
                padding: '10px',
            },
            invalid: {
                color: '#fa755a',
            },
        },
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white shadow-lg rounded-lg p-6 max-w-lg mx-auto"
        >
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
                Complete Your Payment
            </h2>

            <div className="mb-4 bg-gray-50 p-3 rounded-lg border">
                <CardElement options={cardElementStyle} />
            </div>

            <button
                type="submit"
                disabled={!stripe || loading}
                className={`w-full py-3 text-white font-semibold rounded-lg ${
                    loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                }`}
            >
                {loading ? 'Processing...' : 'Pay Now'}
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
