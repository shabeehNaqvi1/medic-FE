import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import React, { useEffect } from "react";
import { AiFillSound, AiOutlineMail } from "react-icons/ai";
import { GoPencil } from "react-icons/go";
import { IoLocationOutline } from "react-icons/io5";
import { MdDriveFileRenameOutline } from "react-icons/md";
import User from "@/utils/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { addUser, showMe } from "@/features/user/userSlice";


  // when client, add user to database when i get to profile page and also change state user name from dbUser to doctor and patient

interface PatientProfileProps {
  email: string;
  name: string;
}

const PatientProfile : React.FC = () => {
  const dispatch = useDispatch();
  const dbUser = useSelector((state: RootState) => state.user.user);
  //@ts-ignore
  const { user }: { user: User } = useUser();
  useEffect(() => {
    if (user) {
      dispatch(
        //@ts-ignore
        addUser({
          email: user?.email,
          profilePicture: user?.picture,
          role: "Patient",
        })
      );
    }
  }, [user]);
  return (
    <>
      <div className="2xl:flex 2xl:flex-row flex flex-col justify-center text-justify items-stretch bg-white sm:bg-inherit sm:h-fit">
        <div className="flex flex-col 2xl:border-r border-gray-300 align-center w-full items-center text-center align-center 2xl:justify-start 2xl:pt-10 sm:justify-start md:sm:justify-start lg:sm:justify-start xl:sm:justify-start 2xl:px-0">
          <div className="h-44 w-44 overflow-hidden rounded-full">
            {dbUser?.profilePicture ? (
              <>
                <Image
                  src={dbUser?.profilePicture}
                  alt="User Picture"
                  width={250}
                  height={250}
                  className="bg-cover min-h-full min-w-full"
                />
              </>
            ) : (
              <>
                <Image
                  src={`${user?.picture}`}
                  alt="User Picture"
                  width={250}
                  height={250}
                  className="bg-cover min-h-full min-w-full"
                />
              </>
            )}
          </div>
          <div className="pt-5 tracking-wider mb-4 text-lg">
            <p className="text-lg text-gray-30">
              {dbUser?.email || user?.email}
            </p>
            <p className="text-xl font-medium">
              {`${
                  dbUser?.firstName === undefined &&
                    dbUser?.lastName === undefined
                  ? ""
                  : `${`${dbUser?.firstName} ${dbUser?.lastName}`}`
              }`}
            </p>
          </div>
          {dbUser?.bio ? (
            <>
              <div className="flex flex-col text-center leading-normal px-12 lg:px-40 2xl:px-12">
                <p>{dbUser?.bio}</p>
              </div>
            </>
          ) : (
            ""
          )}
        </div>

        <div className="md:flex md:flex-col lg:flex lg:flex-col xl:flex xl:flex-col 2xl:flex 2xl:flex-col flex flex-col w-full md:items-center lg:items-center xl:items-center 2xl:items-center  px-16 md:pt-16 pt-8 sm:pb-4 md:pb-16">
          <p className="hidden md:block border-b text-center pb-4 border-gray-300 mb-14 md:ml-0 md:mt-0 lg:ml-0 lg:mt-0 py-2 lg:text-3xl text-2xl px-5">
            My Details
          </p>

          <div className="flex flex-col lg:flex lg:flex-row 2xl:justify-around align-center justify-center lg:w-full">
            {/*======================
            COL 1 
      ====================*/}
            <div className=" sm:flex sm:flex-col bold 2xl:px-0 md:px-10 md:mb-0 lg:basis-[50%] lg:w-[50%]">
              <div className="flex flex-col items-center py-3 mt-4 mb-10 pb-10 border-b">
                <div className="flex flex-row items-center">
                  <MdDriveFileRenameOutline className="text-yellow-500 w-4 h-4" />
                  <p className="text-lg text-gray-500 leading-10 whitespace-nowrap pl-2">
                    First Name:
                  </p>
                </div>
                <p className="px-2 rounded-md text-lg whitespace-nowrap">
                  {dbUser?.firstName || ""}
                </p>
              </div>
            </div>

            {/*====================== 
            COL 2 
      ========================*/}
            <div className="sm:flex sm:flex-col bold 2xl:px-10 md:px-10 mb-10 md:mb-0 lg:basis-[50%] lg:w-[50%]">
              <div className="flex flex-col items-center  py-3 mt-4 mb-10 pb-10 border-b">
                <div className="flex flex-row items-center">
                  <GoPencil className="text-yellow-500 w-4 h-4" />
                  <p className="text-lg text-gray-500 leading-10 whitespace-nowrap pl-2">
                    Last Name:
                  </p>
                </div>
                <p className="px-2 rounded-md text-lg whitespace-nowrap">
                  {dbUser?.lastName || ""}
                </p>
              </div>
            </div>

            {/*======================= 
            COL 3 
      =============================*/}
          </div>
        </div>
      </div>
      {dbUser?.description ? (
        <>
          <div className="border-l border-gray-300 pl-10 pr-10 pb-10 w-full text-center border-b ">
            <div className="mt-10 border-b border-gray-300 pb-4 text-2xl">
              <p className=" ">Description</p>
            </div>
            <div className="flex flex-col pt-10 text-start leading-normal mx-16">
              <p>{dbUser?.description}</p>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default PatientProfile;
