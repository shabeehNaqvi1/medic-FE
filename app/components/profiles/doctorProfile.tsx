import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import React, {useEffect} from "react";
import { AiOutlineMail } from "react-icons/ai";
import { IoLocationOutline } from "react-icons/io5";
import { TbActivity } from "react-icons/tb";
import { GoPencil } from "react-icons/go";
import { GoPeople } from "react-icons/go";
import { MdOutlineWorkOutline } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { CiFlag1 } from "react-icons/ci";
import { MdAssuredWorkload } from "react-icons/md";
import User from "@/utils/types";
import { LuGraduationCap } from "react-icons/lu";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { showMe } from "@/features/user/userSlice";


const DoctorProfile: React.FC= () => {
  const dispatch = useDispatch();
  const dbUser = useSelector((state: RootState) => state.user.user);
  //@ts-ignore
  const { user }: { user: User } = useUser();

  // get user from database
  useEffect(() => {
    //@ts-ignore
    dispatch(showMe({ email: user && user?.email }));
  }, [user]);

  return (
    <>
      <div className="2xl:flex 2xl:flex-row flex flex-col justify-center text-justify items-stretch bg-white sm:bg-inherit  sm:h-fit mb-16">
        <div className=" flex flex-col 2xl:border-r border-gray-300 align-center w-full items-center text-center align-center 2xl:justify-start 2xl:pt-10 sm:justify-start md:sm:justify-start lg:sm:justify-start xl:sm:justify-start 2xl:px-0">
          <div className="flex items-center justify-center h-44 w-44 overflow-hidden rounded-full">
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
          <div className="pt-5 tracking-wider pb-2  text-lg">
            <p className="text-lg text-gray-30">{dbUser?.email}</p>
            <p className="text-xl font-medium">{`${dbUser?.firstName}  ${dbUser?.lastName}`}</p>
          </div>

          {/* specialty, university and workplace */}
          <div className="flex gap-4 mb-4 text-xl font-medium">
            <div className="text-lg mb-1">
              <p>{dbUser?.professionalTitle}</p>
            </div>
            <div className="text-lg mb-1">
              <p>{dbUser?.workPlace}</p>
            </div>
          </div>
          {/* bio */}
          <div className="flex flex-col mx-20 2xl:mx-0 font-thin">
            <div className="flex flex-col text-center leading-normal px-12 md:pb-6 ">
              <p>{dbUser?.bio}</p>
            </div>
          </div>
        </div>

        <div className="md:flex md:flex-col lg:flex lg:flex-col xl:flex xl:flex-col 2xl:flex 2xl:flex-col flex flex-col w-full md:items-center lg:items-center xl:items-center 2xl:items-start  px-16 md:pt-16 pt-8 sm:pb-4 md:pb-16 ">
          <p className="hidden md:block border-b text-center pb-4 border-gray-300 mb-14 md:ml-0 md:mt-0 lg:ml-0 lg:mt-0 py-2 lg:text-3xl text-2xl px-5">
            My Details
          </p>

          <div className="flex flex-col md:flex md:flex-row lg:flex lg:flex-row 2xl:justify-around align-center justify-center">
            {/*======================
            COL 1 
      ====================*/}
            <div className=" sm:flex sm:flex-col bold lg:px-20 2xl:px-0 xl:px-20 md:px-10 md:mb-0 ">
              <div className="flex flex-col items-center py-3 mt-4 mb-10 pb-10 border-b">
                <div className="flex flex-row items-center">
                  <GoPencil className="text-yellow-500 w-4 h-4" />
                  <p className="text-lg text-gray-500 leading-10 whitespace-nowrap pl-2">
                    First Name:
                  </p>
                </div>
                <p className="px-2 rounded-md text-lg whitespace-nowrap ">
                  {dbUser?.firstName}
                </p>
              </div>
              {dbUser?.professionalTitle ? (
                <div className="flex flex-col items-center py-3 mt-4 mb-10 pb-10 border-b">
                  <div className="flex flex-row items-center">
                    <TbActivity className="text-yellow-500 w-4 h-4" />
                    <p className="text-lg text-gray-500 leading-10 whitespace-nowrap pl-2">
                      Professional Title:
                    </p>
                  </div>
                  <p className="px-2 rounded-md text-lg whitespace-nowrap">
                    {dbUser?.professionalTitle}
                  </p>
                </div>
              ) : (
                ""
              )}
            </div>

            {/*====================== 
            COL 2 
      ========================*/}
            <div className="sm:flex sm:flex-col bold lg:px-20 2xl:px-10 xl:px-20 md:px-10  md:mb-0">
              <div className="flex flex-col items-center py-3 mt-4 mb-10 pb-10 border-b">
                <div className="flex flex-row items-center">
                  <MdDriveFileRenameOutline className="text-yellow-500 w-4 h-4" />
                  <p className="text-lg text-gray-500 leading-10 whitespace-nowrap pl-2">
                    Last Name:
                  </p>
                </div>
                <p className="px-2 rounded-md text-lg whitespace-nowrap">
                  {dbUser?.lastName}
                </p>
              </div>
              {dbUser?.workPlace ? (
                <div className="flex flex-col items-center py-3 mt-4 mb-10 pb-10 border-b">
                  <div className="flex flex-row items-center">
                    <CiFlag1 className="text-yellow-500 w-4 h-4" />
                    <p className="text-lg text-gray-500 leading-10 whitespace-nowrap pl-2">
                      Workplace:
                    </p>
                  </div>
                  <p className="px-2 rounded-md text-lg whitespace-nowrap">
                    {dbUser?.workPlace}
                  </p>
                </div>
              ) : (
                ""
              )}
            </div>

            {/*======================= 
            COL 3 
      =============================*/}
            <div className="sm:flex sm:flex-col bold lg:px-20 2xl:px-0 xl:px-20 md:px-10 mb-10 md:mb-0">
              <div className="flex flex-col items-center py-3 mt-4 mb-10 pb-10 border-b">
                <div className="flex flex-row items-center">
                  <MdAssuredWorkload className="text-yellow-500 w-4 h-4" />
                  <p className="text-lg text-gray-500 leading-10 whitespace-nowrap pl-2">
                    Specialty:
                  </p>
                </div>
                <p className="px-2 rounded-md text-lg whitespace-nowrap">
                  {dbUser?.specialty}
                </p>
              </div>
              {/* location */}
              {dbUser?.location ? (
                <div className="flex flex-col items-center py-3 mt-4 mb-10 pb-10 border-b">
                  <div className="flex flex-row items-center">
                    <IoLocationOutline className="text-yellow-500 w-4 h-4" />
                    <p className="text-lg text-gray-500 leading-10 whitespace-nowrap pl-2">
                      Location:
                    </p>
                  </div>
                  <p className="px-2 rounded-md text-lg whitespace-nowrap">
                    {dbUser?.location}
                  </p>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
      {dbUser?.description && (
        <div className="border-l border-gray-300 pl-10 pr-10 pb-10 w-full text-center border-b ">
          <div className="border-b border-gray-300 pb-4 text-2xl">
            <p className=" ">Description</p>
          </div>
          <div className="flex flex-col pt-10 text-start leading-normal mx-16">
            <p>{dbUser?.description}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default DoctorProfile;
