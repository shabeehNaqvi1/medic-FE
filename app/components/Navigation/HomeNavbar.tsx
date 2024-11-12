'use client';
import { useSelector, useDispatch } from 'react-redux';
import Image from "next/image";
import Link from "next/link";
import Button from "../Button";
import { openMenu, closeMenu } from '@/features/ui/uiSlice';
import { RootState } from '../../../store/store';

function HomeNavbar() {
  const dispatch = useDispatch();
  const isMenuOpen = useSelector((state: RootState) => state.ui.isMenuOpen);
  return (
    <>
        {/* logo */}
      <Link href="/">
        <Image
          src="/assets/images/logo.svg"
          alt="logo"
          width={55}
          height={55}
        />
      </Link>
      {/* buttons container */}
      <div className="lg:flexCenter hidden gap-3">
        {/* register as a patient */}
        <a href="/api/auth/signupPatient">
        {/* @ts-ignore */}
          <Button
            type="button"
            title="Register as a patient"
            variant="register_btn"
          />
        </a>
        {/* register as a doctor */}
        <a href="/api/auth/signupDoctor">
        {/* @ts-ignore */}
          <Button
            type="button"
            title="Register as a doctor"
            variant="register_btn"
          />
        </a>
        {/* login button */}
        <a href="/api/auth/login">
        {/* @ts-ignore */}
          <Button
            type="button"
            title="Login"
            icon="/assets/images/user.svg"
            variant="btn_yellow"
          />
        </a>
      </div>
      {/* menu icon for mobile*/}
        <div className={`flex flex-col w-[45px] p-2 lg:hidden ${isMenuOpen? "" : "space-y-2"}`} onClick={isMenuOpen? () => dispatch(closeMenu()) : () => dispatch(openMenu())}>
            <div className={`h-[1px] w-[30px] bg-gray-600 ease-in-out duration-300 ${isMenuOpen? "rotate-45" : ""}`}></div>
            <div className={`h-[1px] w-[30px] bg-gray-600 ease-in-out duration-300 ${isMenuOpen? "-rotate-45" : ""}`}></div>
            <div className={`h-[1px] w-[30px] bg-gray-600 ${isMenuOpen? "hidden" : ""}`}></div>
        </div>
    </>
  )
}

export default HomeNavbar