"use client";
import { data } from "../../utils/data";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { settings } from "./Slider";
import Image from "next/image";

function Galerie() {
  return (
    <div className="w-3/4 m-auto  ">
      <div className="mt-20 mb-40 ">
        <Slider {...settings}>
          {data.map((d) => (
            <div key={d.name} className=" flex flex-col bg-white h-[580px] text-black rounded-xl  shadow-lg ">
              <div className="h-56 rounded-t-xl bg-yellow-500  flex justify-center items-center">
                <div className="flex items-center  overflow-hidden rounded-full h-44 w-44">
                  <Image
                    src={d.img}
                    alt=""
                    width={3234}
                    height={4851}
                    className="min-w-full min-h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center items-center gap-4 p-4 h-[350px] ">
                <p className="text-xl font-semibold">{d.name}</p>
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
                <p className="py-2 ">{d.review}</p>
                <button className="bg-gray-500 text-white text-lg px-6 py-2 rounded-xl">
                  Read more
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Galerie;
