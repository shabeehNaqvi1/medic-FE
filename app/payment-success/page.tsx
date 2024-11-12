"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createPayment } from "@/features/payment/paymentSlice";
import { useDispatch } from "react-redux";
import { useUser } from "@auth0/nextjs-auth0/client";
import { MdCheckCircle } from "react-icons/md";
import Loading from "../components/Loading";
import { sendMessage } from "@/features/message/messageSlice";

export default function PaymentSuccess({
  searchParams: { amount },
}: {
  searchParams: { amount: string };
}) {
  const { user, isLoading } = useUser();
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const session_id = searchParams.get("session_id");
  const doctor_id = searchParams.get("doctor_id");
  const patient_id = searchParams.get("patient_id");
  const doctor_email = searchParams.get("doctor_email");

  const bodyData = {
    senderId: patient_id,
    senderModel: "Patient",
    receiverModel: "Doctor",
    receiverEmail: doctor_email,
  };

  useEffect(() => {
    if (session_id && doctor_id && patient_id) {
      dispatch(
        createPayment({ patient: patient_id, doctor: doctor_id, amount })
      );
    }
    console.log("hey from payment success");
    setTimeout(() => {
      router.push("/conversations");
    }, 3000);
  }, [session_id]);

  useEffect(() => {
    if (session_id && doctor_id && patient_id && doctor_email) {
      dispatch(
        //@ts-ignore
        sendMessage({
          data: bodyData,
          id: doctor_id,
        })
      );
    }
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex items-start justify-center min-h-screen bg-gradient-to-r from-green-200 to-green-400 pt-20">
      <main className="max-w-md w-full mx-auto p-8 bg-white shadow-xl rounded-2xl mt-10">
        <div className="text-center">
          <MdCheckCircle className="text-green-600 w-16 h-16 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Thank you!</h1>
          <p className="text-gray-600 mb-4">Your payment was successful.</p>
          <div className="mb-6 p-4 bg-green-100 border border-green-200 rounded-lg">
            <h2 className="text-xl font-semibold text-green-600 mb-2">
              You will be redirected to your conversations shortly.
            </h2>
          </div>
          <p className="text-gray-600 mb-6">
            You successfully sent the payment. If you have any questions, please
            contact support.
          </p>
          <div className="bg-green-500 text-white p-4 rounded-lg">
            <p className="text-xl font-bold">Paid Amount: ${amount}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
