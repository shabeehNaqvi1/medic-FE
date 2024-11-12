'use client';
import { RootState } from '@/store/store';
import React from 'react'
import { useSelector } from 'react-redux';
import { homepageLinks, dashboardLinks } from '@/utils/sidebarLinks';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useDispatch } from 'react-redux';
import { closeMenu } from '@/features/ui/uiSlice';
import { MdKeyboardArrowRight } from "react-icons/md";
import Link from 'next/link';


const Sidebar = () => {
  const dispatch = useDispatch();
  const isMenuOpen = useSelector((state: RootState) => state.ui.isMenuOpen);
  const { user } = useUser();
  return (
    <>
      <div className={`${isMenuOpen? "flex" : "hidden"} flex fixed top-0 flex-col left-0 w-full h-full bg-white z-[5]  justify-center space-y-10 items-center pt-[60px] md:flex-col md:items-center md:justify-center lg:hidden`}>
        <ul className="pl-0 list-none md:mt-0 flex flex-col gap-10">
          {user ? <>
          {dashboardLinks.map((link) => {
            return <li key={link.name} className="text-3xl mb-[20px] text-center font-light" onClick={() => dispatch(closeMenu())}>
            <a href={link.href} className="text-black no-underline">
              {link.name}
            </a>
          </li>
          })}
          </> : <>
            {homepageLinks.map((link) => {
              return <li key={link.name} className={`text-2xl mb-[20px] text-center font-light ${link.name === 'Login' ? "bg-green-90 px-8 py-3 mr-5 rounded-full" : ""}`} onClick={() => dispatch(closeMenu())}>
            <a href={link.href} className={`text-black  ${link.name === 'Login' ? "no-underline text-white" : "flex gap-4 border-b pb-2 border-b-black items-center justify-center"}`}>
              {link.name}
              {link.name === 'Login' ? "" : <MdKeyboardArrowRight /> }
            </a>
          </li>
            })}
          </>}
        </ul>
        {user ? 
          <Link
          href="/api/auth/logout"
          className="text-2xl bg-green-90 px-8 py-5 text-white rounded-full"
        >
          Logout
        </Link>
        : ""}
      </div>
    </>
  );
}

export default Sidebar