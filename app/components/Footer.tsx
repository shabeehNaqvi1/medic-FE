import { FOOTER_CONTACT_INFO, FOOTER_LINKS, SOCIALS } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="flexCenter mb-24 mt-[150px]">
      {/* container */}
      <div className="padding-container max-container flex items-center w-full flex-col gap-10 xl:gap-6">
        {/* footer content */}
        <div className="flex flex-col items-start justify-center gap-[10%]  ">
          {/* logo */}
          <Link href="/c" className="mb-10 mx-auto md:mx-0">
            <Image
              src="/assets/images/logo.svg"
              alt="logo"
              width={64}
              height={29}
            />
          </Link>
          {/* footer columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 justify-items-center text-center gap-10 ">
            {FOOTER_LINKS.map((columns) => (
              // learn more and community columns
              <FooterColumn title={columns.title} key={columns.title}>
                <ul className="regular-14 flex flex-col gap-4 text-gray-30">
                  {columns.links.map((link) => (
                    <Link href="" key={link} className="hover:text-yellow-500">
                      {link}
                    </Link>
                  ))}
                </ul>
              </FooterColumn>
            ))}
            {/* contact us column */}
            <div className="flex flex-col text-center gap-5">
              <FooterColumn title={FOOTER_CONTACT_INFO.title}>
                {FOOTER_CONTACT_INFO.links.map((link) => (
                  <Link
                    href="/"
                    key={link.label}
                    className="flex items-center justify-center gap-4 md:flex-col lg:flex-row"
                  >
                    <p className="whitespace-nowrap">{link.label}:</p>
                    <p className="medium-14 whitespace-nowrap text-blue-70">
                      {link.value}
                    </p>
                  </Link>
                ))}
              </FooterColumn>
            </div>
            {/* socials */}
            <div className="flex flex-col text-center md:col-start-1 md:col-end-4 xl:col-start-4 xl:col-end-4 gap-5">
              <FooterColumn title={SOCIALS.title}>
                <ul className="regular-14 flex gap-4 text-gray-30">
                  {SOCIALS.links.map((link) => (
                    <Link href="/" key={link}>
                      <Image src={link} alt="logo" width={24} height={24} />
                    </Link>
                  ))}
                </ul>
              </FooterColumn>
            </div>
          </div>
        </div>
        {/* horizontal line */}
        <div className="border bg-bg-gray-20" />
        {/* rights reserved */}
        <p className="regular-14 w-full text-center text-gray-30">
          2024 MedChatApp || All rights reserved || Owned by One Doc Ventures
          SRL
        </p>
      </div>
    </footer>
  );
};

// Created locally

type FooterColumnProps = {
  title: string;
  children: React.ReactNode;
};

const FooterColumn = ({ title, children }: FooterColumnProps) => {
  return (
    <div className="flex flex-col gap-5">
      <h4 className="bold-18 whitespace-nowrap">{title}</h4>
      {children}
    </div>
  );
};

export default Footer;
