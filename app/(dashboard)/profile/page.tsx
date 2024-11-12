"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState, useLayoutEffect } from "react";
import PatientProfile from "../../components/profiles/patientProfile";
import DoctorProfile from "../../components/profiles/doctorProfile";
import DoctorProfileForm from "../../components/profiles/doctorProfileForm";
import PatientProfileForm from "@/app/components/profiles/patientProfileForm";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { showMe } from "@/features/user/userSlice";
import { redirect, useRouter } from "next/navigation";

interface User {
  email?: string;
  name?: string;
  picture: string;
  // Add other fields from Auth0 as needed
}

interface DoctorProfileData {
  email: string;
  confirmEmail: string;
  firstName: string;
  lastName: string;
  location: string;
  university: string;
  graduation: number;
  personalNumber: number;
  professionalTitle: string;
  specialty: string;
  experienceYears: string;
  workplace: string;
  country: string;
  description: string;
  bio: string;
  role: string;
  picture: string;
}

export default function Profile() {
  const dbUser = useSelector((state: RootState) => state.user.user);
  const loading = useSelector((state: RootState) => state.user.loading);
  const updatingUser = useSelector(
    (state: RootState) => state.user.updatingUser
  );
  //@ts-ignore
  const { user, isLoading }: { user: User } = useUser();
  const dispatch = useDispatch();

  const initialDoctorProfileData: DoctorProfileData = {
    email: "",
    confirmEmail: "",
    firstName: "",
    lastName: "",
    location: "",
    university: "",
    graduation: 0,
    personalNumber: 0,
    professionalTitle: "",
    specialty: "",
    experienceYears: "",
    workplace: "",
    country: "",
    description: "",
    bio: "",
    //@ts-ignore
    role:
      (user &&
        user["http://dev.medichat.com/roles"] &&
        user["http://dev.medichat.com/roles"][0]) ||
      "",
    picture: "",
  };
  const [userData, setUserData] = useState<DoctorProfileData>(
    initialDoctorProfileData
  );
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const savedUserData = localStorage.getItem("userData");
    if (savedUserData) {
      setUserData(JSON.parse(savedUserData));
    } else if (user) {
      setUserData((prevUserData) => ({
        ...prevUserData,
        email: user.email || "",
        firstName: user.name?.split(" ")[0] || "",
        lastName: user.name?.split(" ")[1] || "",
        //@ts-ignore
        role:
          (user &&
            user["http://dev.medichat.com/roles"] &&
            user["http://dev.medichat.com/roles"][0]) ||
          "",
      }));
    }
  }, [user]);

  // useEffect(() => {
  //         if(user && dbUser) {
  //           return;
  //         } else if (
  //           (user &&
  //           user["http://dev.medichat.com/roles"] &&
  //           user["http://dev.medichat.com/roles"][0] === "doctor") &&
  //           !dbUser
  //         )
  //           router.push("/create-doctor-profile");
  // }, [user]);

  useEffect(() => {
    if (user) {
      //@ts-ignore
      dispatch(showMe( user && { email: user?.email }));
    }
  }, [user, dispatch]);

 useEffect(() => {
   if (!isLoading && !loading && user && dbUser) {
     const role = user["http://dev.medichat.com/roles"]?.[0];
     if (role === "doctor" && !dbUser) {
       router.push("/create-doctor-profile");
     }
   }
 }, [user, dbUser, isLoading, loading, router]);

  const handleSave = (updatedData: DoctorProfileData) => {
    setUserData(updatedData);
    localStorage.setItem("userData", JSON.stringify(updatedData));
    setIsEditing(false);
  };

  if (updatingUser || isLoading) return <div>Loading...</div>;
  return (
    <div className="pt-10 sm:pt-20 lg:pt-20">
      <div className="flex bg-gray-00 pt-7 sm:py-7 h-full xl:h-max 2xl:items-center justify-center">
        {/* 3xl:h-screen this property was messing with the page in edit mode */}
        <div className="w-full xl:px-0 2xl:px-5 flex rounded-md sm:w-11/12 md:w-5/6 lg:w-4/5 xl:w-mx-40 3xl:w-2/3">
          <div className="rounded-xl shadow-xl  leading-10 w-full h-full bg-white">
            <div className=" flex flex-row  justify-between items-center sm:pb-4 sm:pt-5 mx-4 md:mx-8 lg:mx-10">
              <p className=" border-b py-5 font-bold ml-4">MyProfile</p>
              <button
                className="btn_dark_green-edit text-white align-center "
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            </div>
            {isEditing ? (
              initialDoctorProfileData.role === "patient" ? (
                //@ts-ignore
                <PatientProfileForm onSave={handleSave} />
              ) : (
                //@ts-ignore
                <DoctorProfileForm onSave={handleSave} />
              )
            ) : (
              <>
                {initialDoctorProfileData.role === "patient" ? (
                  <PatientProfile />
                ) : (
                  <DoctorProfile />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
