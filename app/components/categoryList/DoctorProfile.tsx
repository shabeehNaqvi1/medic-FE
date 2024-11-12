import React, { useState, useEffect } from "react";
import Image from "next/image";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaRegPaperPlane, FaHospitalAlt } from "react-icons/fa";
import { RootState } from "@/store/store";
import Loading from "../Loading";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import ModalStripe from "../../components/Stripe/ModalStripe";
import convertToSubcurrency from "../../lib/convertToSubcurrency";
import { useDispatch, useSelector } from "react-redux";
import {
  setClientSecret,
  setErrorMessage,
} from "@/features/payment/paymentSlice";
import { showMe } from "@/features/user/userSlice";

interface DoctorProfileProps {
  onBack: () => void; // Add the onBack prop
}

interface DoctorProfileDetails {
  _id: string;
  firstName: string;
  lastName: string;
  professionalTitle: string;
  workPlace: string;
  location: string;
  specialty: string;
  profilePicture: string;
  bio: string;
  description: string;
}

const DoctorProfile: React.FC<DoctorProfileProps> = ({ onBack }) => {
  const doctor = useSelector(
    (state: RootState) => state.user.selectedDoctor as DoctorProfileDetails
  );
  const defaultDoctor = useSelector(
    (state: RootState) => state.user.defaultDoctor
  );
  const loadingDefaultDoctor = useSelector(
    (state: RootState) => state.user.loadingDefaultDoctor
  );
  const doctorToRender = doctor || defaultDoctor[0];
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useUser();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false); // Function to close the modal
  };

  const fetchClientSecret = async (amount: number) => {
    if (!user) {
      return router.push("/api/auth/signupPatient");
    }
    console.log("Attempting to fetch client secret...");
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Client secret fetched successfully:", data.clientSecret);
        console.log("data", data);
        dispatch(setClientSecret(data.clientSecret));
      })
      .catch((error) => {
        console.error("Error fetching client secret:", error);
        dispatch(setErrorMessage("Failed to initialize payment."));
      });
    setIsModalOpen(true); // Open modal
  };

  useEffect(() => {
    //@ts-ignore
    dispatch(showMe({ email: user && user.email }));
  }, []);

  if (loadingDefaultDoctor) {
    return <Loading />;
  }

  return (
    <>
      <div className="p-8 bg-gray-200 shadow rounded text-center mt-5 lg:mt-0 sm:h-full">
        <div className="mb-2 lg:hidden">
          <button
            className="flex flex-row items-center gap-2 text-yellow-500 rounded"
            onClick={onBack}
          >
            <IoMdArrowRoundBack className="w-7 h-7" />
            Back
          </button>
        </div>
        <div className="relative flex items-center justify-center rounded-full overflow-hidden w-40 h-40 ml-auto mr-auto mt-5 mb-5">
          <Image
            src={doctorToRender?.profilePicture}
            alt={`${doctorToRender?.firstName} ${doctorToRender?.lastName}`}
            className="bg-cover min-h-full min-w-full"
            width={1920}
            height={1080}
          />
        </div>
        <div className="flex flex-col mb-10">
          <h2 className="text-xl font-bold capitalize">
            Dr. {doctorToRender?.firstName} {doctorToRender?.lastName}
          </h2>
          <p className=" text-yellow-50 capitalize">
            {doctorToRender?.specialty}
          </p>
          <p className=" mb-5">
            {doctorToRender?.location || "Bucuresti,"}{" "}
            {doctorToRender?.country || "Romania"}
          </p>
          <div className=" ">
            <button
              onClick={() => fetchClientSecret(9.99)}
              className="flex flex-row px-4 ml-auto mr-auto bg-gray-700 py-3 text-center justify-center items-center text-white transition-transform duration-300 hover:scale-110 hover:bg-yellow-50 rounded-lg "
            >
              <FaRegPaperPlane className=" mr-2" />
              Send a message
            </button>
          </div>
        </div>
        <div className="flex flex-col mb-10 justify-center text-start ">
          <div className="flex flex-col lg:flex-row text-md gap-10 mb-10 justify-evenly bg-gray-100">
            <span className="shadow-md px-8 py-6 w-full">
              <p className="border-b border-gray-300 mb-4 pb-2 px-2 text-lg font-medium">
                Details
              </p>
              <div className="flex flex-col">
                <div>
                  <p className="text-md font-semibold">Professional Title:</p>
                  <p className="text-sm p-3 font-medium">
                    {doctorToRender?.professionalTitle}
                  </p>
                </div>
                <div>
                  <p className="text-md font-semibold">Specialty:</p>
                  <p className="text-sm p-3 font-medium">
                    {doctorToRender?.specialty}
                  </p>
                </div>
              </div>
            </span>
          </div>
          <div className="flex flex-col lg:flex-row gap-5 items-start lg:items-center w-full">
            <div className="flex flex-col shadow-lg p-6 bg-gray-100 w-full">
              <p className="mb-2 border-b border-gray-300 text-lg pb-2 px-2 font-medium">
                Workplace
              </p>
              <div className=" px-2 p-6 text-md flex items-center justify-start gap-4">
                <FaHospitalAlt className="w-6" />
                <p>{doctorToRender?.workPlace}</p>
              </div>
            </div>
          </div>
        </div>
        {doctor?.description && (
          <div className="flex flex-col lg:flex-row text-md gap-10 mb-10 justify-evenly bg-gray-100">
            <span className="text-justify shadow-md px-8 py-6">
              <p className="border-b border-gray-300 mb-4 pb-2 px-2 text-lg font-medium">
                Description
              </p>
              <span className="text-sm">{doctorToRender?.description}</span>
            </span>
          </div>
        )}
        {doctor?.bio && (
          <div className="flex flex-col lg:flex-row text-md gap-10 mb-10 justify-evenly bg-gray-100">
            <span className="text-justify shadow-md px-8 py-6">
              <p className="border-b border-gray-300 mb-4 pb-2 px-2 text-lg font-medium">
                Biography
              </p>
              <span className="text-sm">{doctorToRender?.bio}</span>
            </span>
          </div>
        )}
        <ModalStripe isOpen={isModalOpen} onClose={closeModal} />
      </div>
    </>
  );
};

export default DoctorProfile;
