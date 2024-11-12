'use client';
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

const CheckoutButton = ({ priceId }) => {
  const dispatch = useDispatch();
  const doctor = useSelector((state: RootState) => state.user.selectedDoctor);
  const defaultDoctor = useSelector(
    (state: RootState) => state.user.defaultDoctor
  );
  const doctorToRender = doctor || defaultDoctor[0];
  const currentUser = useSelector((state: RootState) => state.user.user);
  const [loading, setLoading] = useState(false);
  const handleCheckout = async () => {
    setLoading(true);

    const stripe = await stripePromise;

    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        priceId,
        doctor_id: doctorToRender?._id,
        patient_id: currentUser?._id,
        amount: 9.99,
        customer_email: currentUser?.email,
        doctor_email: doctorToRender?.email,
      }),
    });

    if (response.ok) {
      const session = await response.json();
      const result = await stripe?.redirectToCheckout({
        sessionId: session.id,
      });

      if (result?.error) {
        console.error(result.error.message);
      }
    } else {
      console.error("Failed to create checkout session");
    }

    setLoading(false);
  };

  return (
    <button
      className="w-full p-4 bg-green-500 text-white rounded-md font-bold ease-in-out hover:bg-green-600 transition-all duration-300  shadow-md transform scale-105"
      onClick={handleCheckout}
      disabled={loading}
    >
      {loading ? "Loading..." : "Checkout"}
    </button>
  );
};

export default CheckoutButton;
