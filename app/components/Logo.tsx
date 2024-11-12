import Image from "next/image";
import React from "react";

export const dataImg = [
  {
    img: "/assets/images/MedLife_logo.png",
    alt: "MedLife Logo",
  },
  {
    img: "/assets/images/Sigla_Spitalului_Universitar_de_Urgență_București.png",
    alt: "Spitalul Universitar de Urgență București Logo",
  },
  {
    img: "/assets/images/marie-curie-logo.png",
    alt: "Marie Curie Logo",
  },
  {
    img: "/assets/images/Regina MariaLogo.png",
    alt: "Regina Maria Logo",
  },
];

export const Logo = () => {
  return (
    <div className="w-3/4 m-auto p-4  border shadow-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-items-center w-full gap-20">
        {dataImg.map((dI, index) => (
          <div key={index} className="flex items-center p-10 justify-between">
            <Image
              src={dI.img}
              alt={dI.alt}
              className="object-contain"
              width={100}
              height={100}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
