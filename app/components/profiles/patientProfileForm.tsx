import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import React, { useState, ChangeEvent, FormEvent } from "react";
import User from "@/utils/types";
import { useDispatch, useSelector } from "react-redux"; 
import { RootState } from "@/store/store";
import { updateUserData } from "@/features/user/userSlice";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

interface UserProfileFormProps {
  onSave: (data: User) => void;
}

const PatientProfileForm: React.FC<UserProfileFormProps> = ({
  onSave,
}) => {
  //@ts-ignore
  const { user }: { user: User } = useUser();
  const dispatch = useDispatch();
  const dbUser = useSelector((state: RootState) => state.user.user);
  const [formData, setFormData] = useState({
    firstName: dbUser?.firstName || "",
    lastName: dbUser?.lastName || "",
    description: dbUser?.description || "",
    bio: dbUser?.bio || "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { firstName, lastName } = formData;
    if (!firstName || !lastName)
      return toast.error("First Name and Last Name are required");
    //@ts-ignore
    onSave(formData);
    //@ts-ignore
    dispatch(updateUserData({ user: formData, id: dbUser?._id })); // Save the data to the Redux store
    // toast.success("Profile Updated Successfully");
    // setTimeout(() => {
    //   redirect("/profile");
    //   }, 100);
  };

  return (
    <div className="flex justify-center items-center bg-white sm:bg-gray-100 h-full sm:h-fit">
      <div className="bg-white shadow-lg rounded-xl p-16 w-full">
        {/* Profile Image Section */}

        <div className="flex flex-col items-center ">
          <div className="h-44 w-44 overflow-hidden sm:rounded-full mb-10">
            {user?.picture && (
              <Image
                src={dbUser?.profilePicture}
                alt="User Picture"
                width={250}
                height={250}
              />
            )}
          </div>
          {/* user info */}
          <div className="text-xl font-bold text-center border-b-2 border-gray-300 pb-8 w-full">
            <p>{dbUser?.email || ""}</p>
            <p>
              {dbUser?.firstName} {dbUser?.lastName}
            </p>
          </div>
          <div className="text-md text-center leading-6 pt-2 mb-16 px-20"></div>
        </div>

        {/* Form Section */}
        <form
          className="flex flex-col lg:flex-row lg:flex-wrap"
          onSubmit={handleSubmit}
        >
          {/* container */}
          <div className="flex flex-col lg:flex-row mb-3 w-full gap-4 justify-around">
            {/* first name */}
            <div className="flex gap-4 flex-col lg:flex-row">
              <label
                className="lg:flex lg:items-center lg:justify-center"
                htmlFor="firstName"
              >
                First Name:
              </label>
              <input
                className="bg-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:border-2 focus:border-gray-200"
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            {/* last name */}
            <div className="flex gap-4 flex-col lg:flex-row">
              <label
                className="lg:flex lg:items-center lg:justify-center"
                htmlFor="lastName"
              >
                Last Name:
              </label>
              <input
                className="bg-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:border-2 focus:border-gray-200"
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>
          {/* Description and BIO */}
          <div className="flex flex-col w-full">
            <label className="p-3" htmlFor="bio">
              BIO:
            </label>
            <textarea
              className="mb-3 bg-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:border-2 focus:border-gray-200"
              id="bio"
              name="bio"
              rows={4}
              value={formData.bio}
              //@ts-ignore
              onChange={handleChange}
            />
            <label className="p-3" htmlFor="description">
              Description:
            </label>
            <textarea
              className="mb-3 bg-gray-100 rounded-lg px-4 py-2  focus:outline-none focus:border-2 focus:border-gray-200"
              rows={4}
              id="description"
              name="description"
              value={formData.description}
              //@ts-ignore
              onChange={handleChange}
            />
            {/* save button */}
            <div className="flex justify-center mt-16">
              <button
                className="btn_dark_green-edit rounded-full py-2 px-4 text-center"
                type="submit"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientProfileForm;
