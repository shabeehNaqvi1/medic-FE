import { PEOPLE_URL } from "@/utils";
import Image from "next/image";

interface AboutProps {
  backgroundImage: string;
  title: string;
  subtitle: string;
  peopleJoined: string;
}

const AboutSite = ({
  backgroundImage,
  title,
  subtitle,
  peopleJoined,
}: AboutProps) => {
  return (
    <div className="h-full w-full max-w-[1100px] relative lg:rounded-5xl shadow-lg">
      <div
        className={`${backgroundImage} absolute inset-0 bg-cover bg-center bg-no-repeat lg:rounded-5xl 2xl:rounded-5xl`}
      ></div>
      {/* Dark overlay */}
      <div className="absolute inset-0  bg-black opacity-60 lg:rounded-5xl 2xl:rounded-5xl "></div>
      <div className="relative z-10 flex h-full flex-col items-start justify-center p-4">
        <div className="flexCenter gap-4">
          <div className="flex items-center justify-center rounded-full bg-yellow-50 hover:scale-110 transition-transform duration-300 p-4 w-[80px] h-[80px]">
            <Image
              src="/assets/images/folded-map.svg"
              alt="map"
              width={28}
              height={28}
              className="bg-top min-h-full min-w-full"
            />
          </div>
          <div className="flex flex-col gap-1 basis-[75%] w-[75%]">
            <h4 className="bold-32 text-white">{title}</h4>
            <p className="bold-20 text-white">{subtitle}</p>
          </div>
        </div>
        <div className="flexCenter gap-6">
          <p className="bold-16 md:bold-20 text-yellow-500">{peopleJoined}</p>
        </div>
      </div>
    </div>
  );
};

const About = () => {
  return (
    <section className="px-10 relative flex flex-col py-10 lg:mb-10 lg:py-20 xl:mb-20 align-center">
      <div className="hide-scrollbar flex flex-col lg:flex-row w-full items-start justify-start gap-8 lg:h-[400px] xl:h-[640px] h-[1200px]">
        <AboutSite
          backgroundImage="bg-bg-img-1"
          title="Efficient"
          subtitle="Simplifies appointment scheduling and management."
          peopleJoined=""
        />
        <AboutSite
          backgroundImage="bg-bg-img-2"
          title="Secure"
          subtitle="Uses advanced encryption for data protection."
          peopleJoined=""
        />
        <AboutSite
          backgroundImage="bg-bg-img-doctor"
          title="User-friendly"
          subtitle="Simple menus for scheduling and messaging"
          peopleJoined=""
        />
      </div>
    </section>
  );
};

export default About;
