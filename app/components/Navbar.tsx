'use client';
import HomeNavbar from "./Navigation/HomeNavbar";
import DashboardNav from "./Navigation/DashboardNav";
import { useUser } from "@auth0/nextjs-auth0/client";
import {useState, useEffect} from "react";

const Navbar = () => {
  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 850);
    });
  });
  const { user, isLoading } = useUser();
  if (isLoading) return null;
  return (
    <>
      {/* navbar container */}
    <nav className={`w-full padding-container bg-white lg:bg-slate-100 lg:shadow-lg fixed top-0 flex justify-between align-center items-center pt-4 pb-4 z-[999]`}>
      {user? <DashboardNav /> : <HomeNavbar />}
    </nav>
    </>
  );
};

export default Navbar;