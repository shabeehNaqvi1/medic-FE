import React from "react";
import Image from "next/image";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { selectDoctor } from "@/features/user/userSlice";

interface Doctor {
  _id: number;
  firstName: string;
  lastName: string;
  specialty: string;
  profilePicture: string;
}

interface DoctorListProps {
  category: { 
    id: number;
    name: string;
    icon: React.ReactNode;
    smallerIcon?: React.ReactNode;
  };
  onBack: () => void;
}

const DoctorList: React.FC<DoctorListProps> = ({
  category,
  onBack,
}) => {
  const dispatch = useDispatch();
  const doctors = useSelector((state : RootState ) => state.user.doctors);
  return (
    <div>
      <div className="mb-2">
        <button
          className="flex flex-row items-center justify-center gap-6 btn_yellow-back text-white rounded"
          onClick={onBack}
        >
          <div className="flex gap-4 items-center justify-center">
            <IoMdArrowRoundBack className="w-7 h-7" />
          <span className="w-3 self-center">{category?.smallerIcon}</span>
          <span className="capitalize">{category?.name}</span>
          </div>
        </button>
      </div>
      <ul className="space-y-2 lg:h-[540px]  overflow-y-auto">
        {doctors?.filter((doctor : Doctor) => doctor.specialty === category.name).map((doctor : Doctor) => (
          <li
            key={doctor._id}
            className="cursor-pointer p-2 bg-gray-200 rounded hover:bg-gray-300 flex items-center gap-3"
            onClick={() => dispatch(selectDoctor(doctor))}
          >
            <div>
              <div className="relative rounded-full overflow-hidden w-14 h-14 flex items-center justify-center">
                <Image
                src={doctor?.profilePicture}
                alt={doctor.firstName}
                className="bg-cover min-h-full min-w-full"
                width={250}
                height={250}
              />
              </div>
            </div>
            <div className="flex flex-col w-full">
              <span className="capitalize font-semibold text-lg">{`Dr. ${doctor.firstName} ${doctor.lastName}`}</span>
              <div className="text-sm flex flex-col text-[rgba(0,0,0,.6)] pl-2">
                <span>Spitalul Regina Maria</span>
                <span>Bucuresti</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorList;
