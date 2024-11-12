'use client';
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { updateUserData } from "@/features/user/userSlice";
import toast from "react-hot-toast";

interface DoctorProfileData {
  firstName: string;
  lastName: string;
  professionalTitle: string;
  specialty: string;
  location: string;
  workPlace: string;
  description: string;
  bio: string;
}

interface DoctorProfileFormProps {
  onSave: (data: DoctorProfileData) => void;
}

const DoctorProfileForm: React.FC<DoctorProfileFormProps> = ({
  onSave,
}) => {
  const dispatch = useDispatch();
  const dbUser = useSelector((state: RootState) => state.user.user);
  const [formData, setFormData] = useState<DoctorProfileData>({
    firstName: dbUser?.firstName || "",
    lastName: dbUser?.lastName || "",
    professionalTitle: dbUser?.professionalTitle || "",
    specialty: dbUser?.specialty || "",
    location: dbUser?.location || "",
    workPlace: dbUser?.workPlace || "",
    description: dbUser?.description || "",
    bio: dbUser?.bio || "",
  });
  const [saved, setSaved] = useState(false);
  //@ts-ignore
  const { user }: { user: User } = useUser();

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
    onSave(formData);
    setSaved(true);
    //@ts-ignore
    dispatch(updateUserData({ user: formData, id: dbUser?._id })); // Save the data to the Redux store
    // toast.success("Profile updated successfully!");
    // setTimeout(() => {
    //   window.location.reload();
    //   }, 100);
  };

  return (
    <div className="flex justify-center items-center bg-white sm:bg-gray-100 h-full sm:h-fit">
      <div className="bg-white shadow-lg p-16 w-full">
        {/* Profile Image Section */}

        <div className="flex flex-col items-center ">
          <div className="h-44 w-44 overflow-hidden rounded-full mb-10">
            {dbUser?.profilePicture && (
              <Image
                src={dbUser?.profilePicture}
                alt="User Picture"
                width={250}
                height={250}
              />
            )}
          </div>
          <div className="text-xl font-bold text-center border-b-2 border-gray-300 pb-8 w-full">
            <p>{dbUser?.email}</p>
            <p>{dbUser?.firstName + dbUser?.lastName}</p>
          </div>
          <div className="text-md text-center leading-6 pt-2 mb-16 px-20"></div>
        </div>

        {/* Form Section */}
        <form
          className="flex flex-col lg:flex-row lg:flex-wrap w-full gap-8 flex-center justify-center"
          onSubmit={handleSubmit}
        >
          {/* Left Column on Larger Screens */}
          <div className="flex flex-col mb-6 lg:basis-[45%] lg:w-[45%]">
            {/* first name */}
            <label className="p-2" htmlFor="firstName">
              First Name:
            </label>
            <input
              className="mb-3 lg:mb-5 bg-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:border-2 focus:border-gray-200"
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            {/* last name */}
            <label className="p-2" htmlFor="lastName">
              Last Name:
            </label>
            <input
              className="mb-3 lg:mb-5 bg-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:border-2 focus:border-gray-200"
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
            {/* workplace */}
            <label className="p-2" htmlFor="workPlace">
              Workplace:
            </label>
            <input
              className="mb-3 lg:mb-5 bg-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:border-2 focus:border-gray-200"
              type="text"
              id="workPlace"
              name="workPlace"
              value={formData.workPlace}
              onChange={handleChange}
            />
          </div>

          {/* Right Column on Larger Screens */}
          <div className="flex flex-col mb-6 lg:basis-[45%] lg:w-[45%] ">
            {/* professional title */}
            <label className="p-2" htmlFor="professionalTitle">
              Professional Title:
            </label>
            <select
              className="mb-3 lg:mb-5 bg-gray-100 rounded-lg px-3 py-[17px] focus:outline-none focus:border-2 focus:border-gray-200"
              id="professionalTitle"
              name="professionalTitle"
              value={formData.professionalTitle}
              onChange={handleChange}
            >
              <option value="Medic Primar">Medic Primar</option>
              <option value="Medic Specialist">Medic Specialist</option>
              <option value="Medic Rezident">Medic Rezident</option>
              <option value="Medic Generalist">Medic Generalist</option>
            </select>
            {/* specialty */}
            <label className="p-2" htmlFor="specialty">
              Specialty:
            </label>
            <select
              className="mb-3 lg:mb-5 bg-gray-100 rounded-lg px-3 py-[17px] focus:outline-none focus:border-2 focus:border-gray-200"
              id="specialty"
              name="specialty"
              value={formData.specialty}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="allergy and clinical immunology">
                Allergy and Clinical Immunology
              </option>
              <option value="anesthesia and intensive care">
                Anesthesia and Intensive Care
              </option>
              <option value="audiology and hearing aids">
                Audiology and Hearing Aids
              </option>
              <option value="cardiology">Cardiology</option>
              <option value="cardiovascular surgery">
                Cardiovascular Surgery
              </option>
              <option value="dental prosthetics">Dental Prosthetics</option>
              <option value="dermatovenerology">Dermatovenerology</option>
              <option value="diabetes nutrition metabolic diseases">
                Diabetes, Nutrition, and Metabolic Diseases
              </option>
              <option value="dietetics">Dietetics</option>
              <option value="emergency medicine">Emergency Medicine</option>
              <option value="endocrinology">Endocrinology</option>
              <option value="epidemiology">Epidemiology</option>
              <option value="family medicine">Family Medicine</option>
              <option value="gastroenterology">Gastroenterology</option>
              <option value="general medicine">General Practitioner</option>
              <option value="general surgery">General Surgery</option>
              <option value="geriatrics gerontology">
                Geriatrics and Gerontology
              </option>
              <option value="hematology">Hematology</option>
              <option value="infectious diseases">Infectious Diseases</option>
              <option value="internal medicine">Internal Medicine</option>
              <option value="laboratory medicine">Laboratory Medicine</option>
              <option value="medical expertise">Medical Expertise</option>
              <option value="medical genetics">Medical Genetics</option>
              <option value="medical recovery">Medical Recovery</option>
              <option value="neonatology">Neonatology</option>
              <option value="nephrology">Nephrology</option>
              <option value="neurosurgery">Neurosurgery</option>
              <option value="nuclear medicine">Nuclear Medicine</option>
              <option value="nutrition diets lifestyle">
                Nutrition, Diets, Lifestyle
              </option>
              <option value="obstetrics gynecology">
                Obstetrics-Gynecology
              </option>
              <option value="oncological surgery">Oncological Surgery</option>
              <option value="oncology">Oncology</option>
              <option value="ophthalmology">Ophthalmology</option>
              <option value="oral and maxillofacial surgery">
                Oral and Maxillofacial Surgery
              </option>
              <option value="orthodontics">Orthodontics</option>
              <option value="orthopedics traumatology">
                Orthopedics and Traumatology
              </option>
              <option value="otorhinolaryngology">
                Otorhinolaryngology (ENT)
              </option>
              <option value="pediatric cardiology">Pediatric Cardiology</option>
              <option value="pediatric gastroenterology">
                Pediatric Gastroenterology
              </option>
              <option value="pediatric nephrology">Pediatric Nephrology</option>
              <option value="pediatric neurology">Pediatric Neurology</option>
              <option value="pediatric oncology hematology">
                Pediatric Oncology and Hematology
              </option>
              <option value="pediatric orthopedics">
                Pediatric Orthopedics
              </option>
              <option value="pediatric psychiatry">Pediatric Psychiatry</option>
              <option value="pediatric pneumology">Pediatric Pneumology</option>
              <option value="pediatric surgery">Pediatric Surgery</option>
              <option value="pediatrics">Pediatrics</option>
              <option value="periodontology">Periodontology</option>
              <option value="parenting">Parenting</option>
              <option value="pharmacy">Pharmacy</option>
              <option value="plastic surgery">
                Plastic Surgery - Reconstructive Microsurgery
              </option>
              <option value="psychiatry">Psychiatry</option>
              <option value="psychology">Psychology</option>
              <option value="radiology and medical imaging">
                Radiology and Medical Imaging
              </option>
              <option value="radiotherapy">Radiotherapy</option>
              <option value="rheumatology">Rheumatology</option>
              <option value="sports medicine">Sports Medicine</option>
              <option value="thoracic surgery">Thoracic Surgery</option>
              <option value="urology">Urology</option>
              <option value="vascular surgery">Vascular Surgery</option>
              <option value="veterinary medicine">Veterinary Medicine</option>
              {/* Add other specializations as needed */}
            </select>
            {/* location */}
            <label className="p-2" htmlFor="location">
              Location:
            </label>
            <input
              className="mb-3 lg:mb-5 bg-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:border-2 focus:border-gray-200"
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
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
            {saved && <p className="text-green-500 text-center">Saved!</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorProfileForm;
