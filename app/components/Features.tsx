import { FEATURES } from "@/utils";
import Image from "next/image";
import React from "react";

const Features = () => {
  return (
    <section className="flex-col flexCenter overflow-hidden bg-center bg-no-repeat py-20">
      <div className="px-10 relative w-full flex justify-end gap-10">
        <div className="shadow-2xl hidden lg:flex flex-1 rounded-full overflow-hidden pr-4 xl:basis-[40%] xl:w-[40%]">
          <Image
            src="/assets/images/features.png"
            alt="freedom"
            width={440}
            height={800}
            className="object-cover"
          />
        </div>
        <div className="z-20 flex w-full flex-col xl:basis-[60%] xl:w-[60%]">
          <div className="relative">
            <Image
              src=""
              alt=""
              className="absolute left-[-5px] top-[-28px] w-10 lg:w-[50px]"
            />
            <h2 className="bold-40 lg:bold-64">Our Features</h2>
          </div>
          <ul className="mt-10 pl-10 grid gap-10 md:grid-cols-2 lg:mg-20 lg:gap-18 ">
            {FEATURES.map((feature) => (
              <FeatureItem
                key={feature.title}
                title={feature.title}
                icon={feature.icon}
                description={feature.description}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

// Used only in this page to It will be defined only here
type FeatureItem = {
  title: string;
  icon: string;
  description: string;
};

const FeatureItem = ({ title, icon, description }: FeatureItem) => {
  return (
    <li className="flex w-full flex-1 flex-col items-start">
      <div className="rounded-full p-4 lg:p-7 bg-yellow-50 hover:scale-110 transition-transform duration-300">
        <Image src={icon} alt="map" width={28} height={28} />
      </div>
      <h2 className="bold-20 lg:bold-32 mt-5 capitalize">{title}</h2>
      <p className="regular-16 mt-5 bg-white/80 text-gray-30 lg:mt-[30px] lg:bg-none">
        {description}
      </p>
    </li>
  );
};

export default Features;
