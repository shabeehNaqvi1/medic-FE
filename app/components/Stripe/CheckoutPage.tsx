"use client";

import React, { useState, useEffect } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { createPayment, setErrorMessage } from "@/features/payment/paymentSlice";
import { useRouter } from "next/navigation";

const CheckoutPage = ({ amount }: { amount: number }) => {
  const currentUser = useSelector((state: RootState) => state.user.user);
    const doctor = useSelector(
    (state: RootState) => state.user.selectedDoctor
  );
  const defaultDoctor = useSelector(
    (state: RootState) => state.user.defaultDoctor
  );
  const doctorToRender = doctor || defaultDoctor[0];
  const clientSecret = useSelector((state: RootState) => state.payment.clientSecret);
  const errorMessage = useSelector((state: RootState) => state.payment.errorMessage);
  const selectedOption = useSelector((state: RootState)=> state.payment.selectedOption);
  const stripe = useStripe();
  const router = useRouter();
  const dispatch = useDispatch();
  const elements = useElements();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      dispatch(setErrorMessage(submitError.message))
      setLoading(false);
      return;
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `https://medic-chat-front-end.vercel.app/payment-success?amount=${amount}`,
      },
      redirect: "if_required",
    });
    if (error) {
      dispatch(setErrorMessage(error.message))
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
    // dispatch(createPayment({patient: currentUser?._id, doctor: doctorToRender?._id, amount: amount}));
    router.push(`/payment-success?amount=${amount}`);
  } else {
    console.log(error);
    return;
  }
    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] 
            text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-2 py-4 rounded-md">
      <div className=" mb-5">
        {clientSecret && <PaymentElement />}
        {errorMessage && <div>{errorMessage}</div>}
      </div>
      <div className="">
        <button
          disabled={!stripe || loading || !selectedOption}
          className="text-white w-full p-5 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
        >
          {!loading ? `Pay ${amount}` : "Processing..."}
        </button>
      </div>
    </form>
  );
};

export default CheckoutPage;
