"use client";
import { useState, useEffect, use } from "react";
import CategoryList from "../../components/categoryList/CategoryList";
import DoctorList from "../../components/categoryList/DoctorList";
import DoctorProfile from "../../components/categoryList/DoctorProfile";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { getDefaultDoctor, getDoctors, unselectDoctor } from "@/features/user/userSlice";

const Home = () => {
  const dispatch = useDispatch();
  const selectedDoctor = useSelector((state: RootState) => state.user.selectedDoctor);
  const defaultDoctor = useSelector((state: RootState) => state.user.defaultDoctor);
  const [selectedCategory, setSelectedCategory] = useState<{id: number, name: string, icon: React.ReactNode, smallerIcon?: React.ReactNode;} | null>(null);

  const handleSelectCategory = (category: {id: number, name: string, icon: React.ReactNode, smallerIcon?: React.ReactNode;}) => {
    setSelectedCategory(category);
    // dispatch(unselectDoctor());
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    // dispatch(unselectDoctor());
  };

  const handleBackToDoctors = () => {
    dispatch(unselectDoctor());
  };

  useEffect(() => {
    //@ts-ignore
    dispatch(getDefaultDoctor({ specialty: "general medicine" }));
  }, []);

  return (
    <div className="sm:max-w-[580px] md:max-w-[720px] lg:max-w-[980px] lg:px-[15px] xl:max-w-[1140px] 2xl:max-w-[1390px] sm:p-4 mx-auto mt-20 lg:mt-6">
      {/* Mobile and Tablet View */}
      <div className="block lg:hidden ">
        {(selectedCategory !== null || selectedDoctor !== null) && (
          <button
            className="hidden lg:flex flex-row items-center gap-2 mb-4 text-yellow-500 btn_yellow-back rounded"
            onClick={
              selectedDoctor !== null
                ? handleBackToDoctors
                : handleBackToCategories
            }
          >
            <IoMdArrowRoundBack className="w-7 h-7" />
            Back
          </button>
        )}

        {selectedCategory === null ? (
          <div className="p-4 sm:p-0">
            {/* @ts-ignore */}
            <CategoryList onSelectCategory={handleSelectCategory} />
          </div>
        ) : selectedDoctor === null ? (
          <div className="p-4 sm:p-0">
            <DoctorList
              category={selectedCategory}
              onBack={handleBackToCategories}
            />
          </div>
        ) : (
          <DoctorProfile onBack={handleBackToDoctors} />
        )}
      </div>

      {/* Desktop View */}
      <div className="hidden lg:flex gap-4">
        <div className="lg:basis-[40%] lg:w-[40%] xl:basis-[34%] xl:w-[66%]">
          {selectedCategory === null ? (
            //@ts-ignore
            <CategoryList onSelectCategory={handleSelectCategory} />
          ) : (
            <DoctorList
              category={selectedCategory}
              onBack={handleBackToCategories}
            />
          )}
        </div>
        {defaultDoctor.length > 0 || selectedDoctor !== null ? (
          <div className="lg:basis-[60%] lg:w-[60%] xl:basis-[66%] xl:w-[66%]">
            <DoctorProfile onBack={handleBackToDoctors} />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Home;
