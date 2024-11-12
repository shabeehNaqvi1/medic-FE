import React, { useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { getDoctors } from "@/features/user/userSlice";
import { Category, categories } from "@/utils/categoryList";

interface Doctor {
  _id: string;
  name: string;
  profilePicture: string;
  firstName: string;
  specialty: string;
}

interface CategoryListProps {
  onSelectCategory: (category: Category) => {};
}

const CategoryList: React.FC<CategoryListProps> = ({ onSelectCategory }) => {
  const dispatch = useDispatch();
  const doctors = useSelector((state: RootState) => state.user.doctors);
  useEffect(() => {
    //@ts-ignore
    dispatch(getDoctors());
  }, []);
  return (
    <>
      <ul className="space-y-4 mt-10 lg:mt-0 lg:h-screen  overflow-y-auto">
        {categories
          .filter((category) =>
            doctors.some((doctor: Doctor) => doctor.specialty === category.name)
          )
          .map((category) => (
            <li
              key={category.id}
              className="cursor-pointer p-4 bg-gray-200 rounded hover:bg-gray-300"
              onClick={() => onSelectCategory(category)}
            >
              <div className="flex items-center gap-4">
                <div className="flex flex-col w-full">
                  {/* icon and specialty name */}
                  <div className="flex gap-6 items-center">
                    {category.icon}
                    <div className="font-bold text-xl capitalize">
                      {category.name}
                    </div>
                  </div>
                  {/* doctor icons */}
                  <div className="flex flex-col w-full">
                    <div className="flex justify-between items-center w-full">
                      <div className="flex flex-row gap-2 mt-2 items-center w-full">
                        {doctors
                          ?.filter(
                            (doctor: Doctor) =>
                              doctor.specialty === category.name
                          )
                          .slice(0, 4)
                          .map((doctor: Doctor) => (
                            <div
                              key={doctor._id}
                              className="relative flex items-center overflow-hidden justify-center rounded-full w-14 h-14"
                            >
                              <Image
                                src={doctor.profilePicture}
                                alt={doctor.firstName}
                                width={250}
                                height={250}
                                className="bg-cover min-h-full min-w-full"
                              />
                            </div>
                          ))}
                      </div>
                      {doctors?.filter(
                        (doctor: Doctor) => doctor.specialty === category.name
                      ).length > 4 ? (
                        <>
                          <div className="w-14 h-14 p-4 justify-center rounded-full flex items-center text-xl font-light bg-gray-100">
                            {doctors?.filter(
                              (doctor: Doctor) =>
                                doctor.specialty === category.name
                            ).length > 4
                              ? `+${
                                  doctors?.filter(
                                    (doctor: Doctor) =>
                                      doctor.specialty === category.name
                                  ).length - 4
                                }`
                              : ""}
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
};

export default CategoryList;
