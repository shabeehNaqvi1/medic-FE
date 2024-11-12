import React from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Loading from "../Loading";
import PricingOptions from "./PricingOptions"; // Ensure you import the correct path

interface ModalStripeProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalStripe: React.FC<ModalStripeProps> = ({ isOpen, onClose }) => {
  const clientSecret = useSelector(
    (state: RootState) => state.payment.clientSecret
  );

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;
  const priceId = "price_1PdBusRwCMhJDLZknZUFP9wx"; // Replace with your actual price ID

  return (
    <>
      {priceId !== null && clientSecret ? (
        <div className="bg-white md:rounded-lg fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-center mt-6 sm:mt-8 md:mt-12 lg:mt-16">
          {/* Clsose button */}
          <button onClick={onClose}>
            <IoIosCloseCircle className="h-9 w-9 text-gray-600 absolute top-16 right-2 md:right-10" />
          </button>
          {/* Container */}
          <div className="px-4 pt-32">
            {/* Pricing options */}
            <div className="pb-10">
              <PricingOptions />
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default ModalStripe;
