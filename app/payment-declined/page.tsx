"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
import { MdErrorOutline } from "react-icons/md";
import Loading from "../components/Loading";

export default function PaymentFailed({
  searchParams: { amount },
}: {
  searchParams: { amount: string };
}) {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/doctors");
    }, 3000);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex items-start justify-center min-h-screen bg-gradient-to-r from-red-200 to-red-300 pt-20 ">
      <main className="max-w-md w-full mx-auto p-8 bg-white shadow-xl rounded-2xl mt-10">
        <div className="text-center">
          <MdErrorOutline className="text-red-600 w-16 h-16 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Payment Failed!
          </h1>
          <p className="text-gray-600 mb-4">
            Unfortunately, your payment was not successful.
          </p>
          <div className="mb-6 p-4 bg-red-100 border border-red-200 rounded-lg">
            <h2 className="text-xl font-semibold text-red-600 mb-2">
              You will be redirected to the doctors page shortly.
            </h2>
          </div>
          <p className="text-gray-600 mb-3">
            Please try again or contact support for assistance.
          </p>
        </div>
      </main>
    </div>
  );
}
