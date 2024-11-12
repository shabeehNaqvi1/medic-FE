import Image from "next/image";
import React from "react";

const Guide = () => {
  return (
    <section className="flexCenter flex-col">
      <div className=" padding-container max-container w-full sm:pb-24 justify-center">
        <Image
          src="/assets/images/lifeicon.png"
          alt="about"
          width={70}
          height={70}
        />
        <p className="uppercase regular-18 -mt-1 mb-3 text-yellow-50 pt-5 ">
          We are here to help.
        </p>
        <div className="flex flex-wrap justify-between gap-5 lg:gap-10">
          <h2 className="bold-40 lg:bold-64 xl:w-full">
            Connect with doctors from all over the world
          </h2>
          <p className="regular-20 text-gray-30 xl:w-full">
            Connect with doctors all over the world through our innovative
            platform, designed to bridge the gap between patients and healthcare
            professionals. Whether you need a second opinion, specialized care,
            or immediate medical advice, our network of qualified doctors from
            various fields and regions is available 24/7.
          </p>
        </div>
      </div>
      {/* why should you connect? */}
      <div className="hidden sm:flexCenter max-container relative w-full">
        <Image
          src="/assets/images/img-3.png"
          alt="Guide img"
          width={1440}
          height={580}
          className=" w-full object-cover object-center 2xl:rounded-5xl h-[300px] lg:h-[450px]"
        />
        <div className="absolute flex bg-white py-8 pl-5 pr-7 gap-3 rounded-3xl border shadow-2xl md:left-[5%] lg:top-20 ">
          <Image
            src="/assets/images/meter.png"
            alt="LifeMeter"
            width={260}
            height={260}
            className="h-full w-auto"
          />
          <div className="flexBetween flex-col ">
            <div className="flex w-full flex-col">
              <div className="flex-between w-full ">
                <p className="bold-20 text-yellow-50">
                  Why should you connect? Well, because...
                </p>
                <p className="regular-16 ">
                  You can connect with doctors globally.
                </p>
                <p className="regular-16">
                  You can get immediate medical advice.
                </p>
                <p className="regular-16 ">
                  You can access specialized care anytime.
                </p>
                <p className="regular-16">
                  You can hear from expert doctors available anytime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Guide;
