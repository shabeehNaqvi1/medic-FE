import Image from "next/image";
import Button from "./Button";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

const Hero = () => {
  const router = useRouter();
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

  return (
    // container
    <section
      className="max-container pt-40 padding-container flex flex-col items-center gap-10 py-10
  lg:py-20 lg:pt-40 lg:flex-row xl:flex-row md:flex-row md:gap-5 sm:gap-10 lg:gap-20"
    >
      {/* left column */}
      <div className="relative z-20 flex flex-1 flex-col items-center justify-center lg:items-start lg:justify-start basis-full w-full md:basis-[55%] md:w-[55%] 2xl:basis-[50%] 2xl:w-[50%] text-center lg:text-left">
        <h1 className="bold-52 lg:bold-64">
          Welcome to MedicChat: Your Health, Your Way
        </h1>
        <p className="regular-16 mt-6 text-gray-30 xl:w-[520px] ">
          Discover the future of healthcare with MedicChat. Our app connects you
          with certified healthcare professionals anytime, anywhere. Whether you
          need a quick consultation, follow-up advice, or a second opinion,
          MedicChat is here for you. In limited locations we can provide
          hospital grate equipment such as EKG, Ultrasound, Biochemistry etc.
        </p>
        {/* stars */}
        <div className="my-8 flex flex-col flex-wrap gap-2 items-center justify-center lg:items-start">
          <div className="flex items-center gap-2">
            {Array(5)
              .fill(1)
              .map((_, index) => (
                <Image
                  src="/assets/images/star.svg"
                  key={index}
                  alt="star"
                  width={24}
                  height={24}
                />
              ))}
          </div>
          <p className="bold-16 lg:bold-20 text-blue-70">
            323K
            <span className="regular-16 lg:regular-20 ml-1">
              Excellent Reviews
            </span>
          </p>
        </div>
        {/* button */}
        <div className="flex py-2" onClick={() => router.push("/get-doctor")}>
          {/* @ts-ignore */}
          <Button
            type="button"
            title="Get a doctor now!"
            variant="get_doctor_btn"
          />
        </div>
      </div>
      {/* right column */}
      <div className="flex basis-full w-full md:basis-[45%] md:w-[45%] 2xl:basis-[50%] 2xl:w-[50%] items-center justify-center">
        {/* image container */}
        <div className="flex items-center overflow-hidden rounded-full min-[1100px]:h-[425px] min-[1100px]:w-[425px] 2xl:h-[650px] 2xl:w-[650px] xl:h-[520px] xl:w-[520px] lg:h-[350px] lg:w-[350px] md:h-[330px] md:w-[330px] h-[280px] w-[280px]">
          <Image
            src="/assets/images/landing.jpg"
            alt=""
            width={1000}
            height={1000}
            className="object-cover min-h-full min-w-full items-center"
          />
        </div>
      </div>
    </section>
  );
};
export default Hero;
