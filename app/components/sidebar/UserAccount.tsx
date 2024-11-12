import { RootState } from "@/store/store";
import React from "react";
import { useSelector } from "react-redux";

const UserAccount: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  return (
    <div className="flex items-center py-2 px-2 bg-gray-200 border border-gray-300 rounded-md">
      <div className="relative avatar ">
        <div className="w-14 rounded-full">
          <img
            src={user?.profilePicture}
            alt={`${user?.firstName} ${user?.lastName}'s avatar`}
          />
        </div>
      </div>
      <div className=" items-center ml-6">
        <p className="text-black text-lg font-semibold break-all">{`${
          user?.role === "Doctor"
            ? `DR. ${`${user?.firstName} ${user?.lastName}`}`
            : user?.firstName === undefined && user?.lastName === undefined
            ? user?.email
            : `${`${user?.firstName} ${user?.lastName}`}`
        }`}</p>
        <div className="border-b border-gray-300 pt-1"></div>
      </div>
    </div>
  );
};

export default UserAccount;
