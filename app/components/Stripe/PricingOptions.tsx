import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSelectedOption } from "@/features/payment/paymentSlice";
import { MdQuestionAnswer } from "react-icons/md";
import { GiHealthNormal } from "react-icons/gi";
import { BiConversation } from "react-icons/bi";
import { IoTimeOutline } from "react-icons/io5";
import CheckoutButton from "../CheckoutButton";

const PricingOptions: React.FC = () => {
  const dispatch = useDispatch();
  const prices = [
    {
      id: 1,
      label1: "Just-in-time answers for our medical team.",
      label2: "Best advice regarding your health.",
      label3: "Instant conversations.",
      label4: "Choose the time you want to spend with the doctor.",
      amount: 9.99,
    },
  ];

  const [activeButton, setActiveButton] = useState<{
    [key: number]: string | null;
  }>({});
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  useEffect(() => {
    // Set the default selection
    const defaultPrice = prices[0]; // Assuming you want to preselect the first price option
    setActiveButton({ [defaultPrice.id]: "30 minutes" });
    setSelectedAmount(defaultPrice.amount);
    dispatch(
      setSelectedOption({
        ...defaultPrice,
        time: "30 minutes",
      })
    );
  }, [dispatch]);

  const handleClick = (priceId: number, time: string, amount: number) => {
    setActiveButton((prevState) => ({
      ...prevState,
      [priceId]: time,
    }));
    setSelectedAmount(amount);
    dispatch(
      setSelectedOption({
        ...prices.find((price) => price.id === priceId),
        time,
      })
    );
  };

  const priceId = "price_1PdBusRwCMhJDLZknZUFP9wx"; // Replace with your actual price ID

  return (
    <div className="flex justify-center items-center">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg overflow-auto">
        <div className="p-6 bg-gray-800 text-white text-center">
          <h3 className="text-xl font-bold">
            Total amount: {selectedAmount !== null ? `${selectedAmount}` : ""}
          </h3>
        </div>
        <div className="p-6">
          <ul>
            {prices.map((price) => (
              <li key={price.id} className="mb-5 ">
                <div className="text-black flex flex-col space-y-4 text-start">
                  <div className="flex items-center text-lg">
                    <MdQuestionAnswer className="h-8 w-8 text-gray-800" />
                    <h1 className="pl-4">{price.label1}</h1>
                  </div>
                  <div className="flex items-center text-lg">
                    <GiHealthNormal className="h-8 w-8 text-gray-800" />
                    <h1 className="pl-4">{price.label2}</h1>
                  </div>
                  <div className="flex items-center text-lg">
                    <BiConversation className="h-8 w-8 text-gray-800" />
                    <h1 className="pl-4">{price.label3}</h1>
                  </div>
                  <div className="border-b border-gray-200"></div>
                  <div className="flex items-center text-lg">
                    <IoTimeOutline className="h-8 w-8 text-gray-800" />
                    <h1 className="pl-4">{price.label4}</h1>
                  </div>
                  <div className="border-b border-gray-200"></div>

                  <div className="flex flex-col space-y-2 mt-5">
                    <button
                      className={`text-lg py-3 px-5 w-full text-center rounded-lg transition-all duration-300 ${
                        activeButton[price.id] === "30 minutes"
                          ? "bg-yellow-50 text-white shadow-md "
                          : "bg-green-500 text-white hover:bg-green-600 shadow-sm hover:shadow-md"
                      }`}
                      onClick={() =>
                        handleClick(price.id, "30 minutes", price.amount)
                      }
                    >
                      Time of discussion: 30 minutes
                    </button>
                    <button
                      className={`text-white ${
                        activeButton[price.id] === "30 minutes"
                      } `}
                      disabled={!selectedAmount}
                    >
                      <CheckoutButton priceId={priceId} />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PricingOptions;
