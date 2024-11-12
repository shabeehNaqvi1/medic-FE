"use client";
import Image from "next/image";
import Hero from "./components/Hero";
import About from "./components/About";
import Guide from "./components/Guide";
import Features from "./components/Features";
import Galerie from "./components/Galerie";
import Footer from "./components/Footer";
import { Logo } from "./components/Logo";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useLayoutEffect } from "react";
import { redirect } from "next/navigation";
import Loading from "./components/Loading";

export default function Home() {
  //@ts-ignore
  const { user, isLoading } = useUser();
  console.log(user, "user");
  useEffect(() => {
    if (user) {
      redirect("/profile");
    }
  }, [user]);
  useLayoutEffect(() => {
    if (user) {
      redirect("/profile");
    }
  });

  useEffect(() => {
    const waitForGtag = () => {
      // @ts-ignore
      if (typeof window !== "undefined" && window.gtag) {
        // @ts-ignore
        window.gtag("event", "conversion", {
          send_to: "AW-16748567566/WWYSCImL6N8ZEI64q7I-",
          value: 1.0,
          currency: "RON",
        });
      } else {
        setTimeout(waitForGtag, 500); // Retry after 500ms if gtag is not yet available
      }
    };

    waitForGtag(); // Start waiting for gtag
  }, []);

  if (isLoading) return <Loading />;
  return (
    <>
      <Hero />
      <About />
      <Guide />
      <Features />
      <Galerie />
      <Logo />
      <Footer />
    </>
  );
}
