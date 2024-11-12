//
'use client';
import Image from 'next/image';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, showMe } from '@/features/user/userSlice';
import { redirect, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { RootState } from '../../../store/store';
import { capitalize } from 'lodash';
import Loading from '@/app/components/Loading';

const initialState = {
  email: '',
  profilePicture: '',
  firstName: '',
  lastName: '',
  professionalTitle: '',
  specialty: '',
  location: '',
  workPlace: '',
  role: '',
};

const DoctorRegistrationForm = () => {
  const dbUser = useSelector((state: RootState) => state.user.user);
  const loading = useSelector((state: RootState) => state.user.loading);
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, isLoading } = useUser();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    professionalTitle: '',
    specialty: '',
    location: '',
    workPlace: '',
  });

  // handle form input change
  //@ts-ignore
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
  // handle form submission
  //@ts-ignore
  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, specialty } = formData;
    if (!firstName || !lastName || !specialty) {
      toast.error('Please fill First Name, Last Name and Specialty fields');
      return;
    }
    // @ts-ignore
    dispatch(
      //@ts-ignore
      addUser({
        ...formData,

        //@ts-ignore
        role: 'Doctor',
        profilePicture: '',
        isProfileCompleted: true,
      })
    );
    setFormData(initialState);
    setTimeout(() => {
      toast.success('Profile created successfully');
      router.push('/admin/users');
    }, 250);
  };
  // dispatch showMe action to get user data on component mount
  useEffect(() => {
    if (user) {
      //@ts-ignore
      dispatch(showMe({ email: user.email }));
    }
  }, [user, dispatch]);
  // redirect to profile page if user === patient or dbUser.isProfileCompleted (meaning doctor has already created profile)
  // useLayoutEffect(() => {
  //   //@ts-ignore
  //   if (
  //     user &&
  //     user["http://dev.medichat.com/roles"] &&
  //     user["http://dev.medichat.com/roles"][0] === "patient"
  //   ) {
  //     router.push("/profile");
  //   } else if (dbUser !== null && dbUser.isProfileCompleted) {
  //     router.push("/profile");
  //   }
  // }, [user, dbUser]);
  // useLayoutEffect(() => {
  //   if (
  //     dbUser?.isProfileCompleted ||
  //     (user && user['http://dev.medichat.com/roles']?.[0] === 'patient')
  //   ) {
  //     router.push('/profile');
  //   }
  // }, [dbUser, router]);

  if (loading || isLoading) return <Loading />;
  return (
    <div className='flex items-center justify-center bg-gray-100 min-h-screen pt-10 lg:pt-20'>
      <div className='w-full max-w-4xl p-8 px-12 bg-white shadow-lg'>
        <div className='mb-6 text-center py-5 align-center'>
          {/* Logo area */}
          <div className='h-16 mb-3 align-center'>
            <Image
              src='/assets/images/logo.svg'
              alt='logo'
              width={50}
              height={50}
              className='mx-auto'
            ></Image>
          </div>
          <h2 className='text-2xl font-semibold mb-5'>Create your profile</h2>
        </div>
        <form onSubmit={handleSubmit}>
          {/* first name */}
          <div className='mb-7'>
            <label
              className='block mb-2 text-sm font-bold text-gray-700'
              htmlFor='firstName'
            >
              First Name <span className='text-red-500'>*</span>
            </label>
            <input
              className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
              id='firstName'
              type='text'
              placeholder='First Name'
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          {/* last name */}
          <div className='mb-7'>
            <label
              className='block mb-2 text-sm font-bold text-gray-700'
              htmlFor='lastName'
            >
              Last Name <span className='text-red-500'>*</span>
            </label>
            <input
              className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
              id='lastName'
              type='text'
              placeholder='Last Name'
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div className='mb-7'>
            <label
              className='block mb-2 text-sm font-bold text-gray-700'
              htmlFor='email'
            >
              Email <span className='text-red-500'>*</span>
            </label>
            <input
              className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
              id='email'
              type='email'
              placeholder='Email'
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          {/* professional title */}
          <div className='mb-7'>
            <label
              className='block mb-2 text-sm font-bold text-gray-700'
              htmlFor='professionalTitle'
            >
              Professional Title
            </label>
            <select
              className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
              id='professionalTitle'
              value={formData.professionalTitle}
              onChange={handleChange}
            >
              <option value=''>Select</option>
              <option value='primary-doctor'>Primary Doctor</option>
              <option value='specialist-doctor'>Specialist Doctor</option>
              <option value='resident-doctor'>Resident Doctor</option>
              <option value='general-doctor'>General Doctor</option>
              <option value='other-title'>Other Title</option>
            </select>
          </div>
          {/* specialty */}
          <div className='mb-7'>
            <label
              className='block mb-2 text-sm font-bold text-gray-700'
              htmlFor='specialty'
            >
              Specialty <span className='text-red-500'>*</span>
            </label>
            <select
              className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
              id='specialty'
              value={formData.specialty}
              onChange={handleChange}
            >
              <option value=''>Select</option>
              <option value='allergy and clinical immunology'>
                Allergy and Clinical Immunology
              </option>
              <option value='anesthesia and intensive care'>
                Anesthesia and Intensive Care
              </option>
              <option value='audiology and hearing aids'>
                Audiology and Hearing Aids
              </option>
              <option value='cardiology'>Cardiology</option>
              <option value='cardiovascular surgery'>
                Cardiovascular Surgery
              </option>
              <option value='dental prosthetics'>Dental Prosthetics</option>
              <option value='dermatovenerology'>Dermatovenerology</option>
              <option value='diabetes nutrition metabolic diseases'>
                Diabetes, Nutrition, and Metabolic Diseases
              </option>
              <option value='dietetics'>Dietetics</option>
              <option value='emergency medicine'>Emergency Medicine</option>
              <option value='endocrinology'>Endocrinology</option>
              <option value='epidemiology'>Epidemiology</option>
              <option value='family medicine'>Family Medicine</option>
              <option value='gastroenterology'>Gastroenterology</option>
              <option value='general medicine'>General Practitioner</option>
              <option value='general surgery'>General Surgery</option>
              <option value='geriatrics gerontology'>
                Geriatrics and Gerontology
              </option>
              <option value='hematology'>Hematology</option>
              <option value='infectious diseases'>Infectious Diseases</option>
              <option value='internal medicine'>Internal Medicine</option>
              <option value='laboratory medicine'>Laboratory Medicine</option>
              <option value='medical expertise'>Medical Expertise</option>
              <option value='medical genetics'>Medical Genetics</option>
              <option value='medical recovery'>Medical Recovery</option>
              <option value='neonatology'>Neonatology</option>
              <option value='nephrology'>Nephrology</option>
              <option value='neurosurgery'>Neurosurgery</option>
              <option value='nuclear medicine'>Nuclear Medicine</option>
              <option value='nutrition diets lifestyle'>
                Nutrition, Diets, Lifestyle
              </option>
              <option value='obstetrics gynecology'>
                Obstetrics-Gynecology
              </option>
              <option value='oncological surgery'>Oncological Surgery</option>
              <option value='oncology'>Oncology</option>
              <option value='ophthalmology'>Ophthalmology</option>
              <option value='oral and maxillofacial surgery'>
                Oral and Maxillofacial Surgery
              </option>
              <option value='orthodontics'>Orthodontics</option>
              <option value='orthopedics traumatology'>
                Orthopedics and Traumatology
              </option>
              <option value='otorhinolaryngology'>
                Otorhinolaryngology (ENT)
              </option>
              <option value='pediatric cardiology'>Pediatric Cardiology</option>
              <option value='pediatric gastroenterology'>
                Pediatric Gastroenterology
              </option>
              <option value='pediatric nephrology'>Pediatric Nephrology</option>
              <option value='pediatric neurology'>Pediatric Neurology</option>
              <option value='pediatric oncology hematology'>
                Pediatric Oncology and Hematology
              </option>
              <option value='pediatric orthopedics'>
                Pediatric Orthopedics
              </option>
              <option value='pediatric psychiatry'>Pediatric Psychiatry</option>
              <option value='pediatric pneumology'>Pediatric Pneumology</option>
              <option value='pediatric surgery'>Pediatric Surgery</option>
              <option value='pediatrics'>Pediatrics</option>
              <option value='periodontology'>Periodontology</option>
              <option value='parenting'>Parenting</option>
              <option value='pharmacy'>Pharmacy</option>
              <option value='plastic surgery'>
                Plastic Surgery - Reconstructive Microsurgery
              </option>
              <option value='psychiatry'>Psychiatry</option>
              <option value='psychology'>Psychology</option>
              <option value='radiology and medical imaging'>
                Radiology and Medical Imaging
              </option>
              <option value='radiotherapy'>Radiotherapy</option>
              <option value='rheumatology'>Rheumatology</option>
              <option value='sports medicine'>Sports Medicine</option>
              <option value='thoracic surgery'>Thoracic Surgery</option>
              <option value='urology'>Urology</option>
              <option value='vascular surgery'>Vascular Surgery</option>
              <option value='veterinary medicine'>Veterinary Medicine</option>
            </select>
          </div>
          {/* work place */}
          <div className='mb-7'>
            <label
              className='block mb-2 text-sm font-bold text-gray-700'
              htmlFor='workPlace'
            >
              Workplace
            </label>
            <input
              className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
              id='workPlace'
              type='text'
              placeholder='Work place'
              value={formData.workPlace}
              onChange={handleChange}
            />
          </div>
          {/* location */}
          <div className='mb-7'>
            <label
              className='block mb-2 text-sm font-bold text-gray-700'
              htmlFor='location'
            >
              Location
            </label>
            <input
              className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline'
              id='location'
              type='text'
              placeholder='Location'
              value={formData.location}
              onChange={handleChange}
            />
          </div>
          {/* submit button */}
          <div className='text-center'>
            <button
              className='px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline'
              type='submit'
            >
              Create Doctor Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorRegistrationForm;
