import { FaPaw, FaRunning, FaTeeth, FaToilet, FaXRay } from "react-icons/fa";
import { FaBrain } from "react-icons/fa6";
import { MdHealthAndSafety } from "react-icons/md";
import {
  FaDeaf,
  FaStethoscope,
  FaMicroscope,
  FaAmbulance,
  FaUserMd,
  FaDna,
  FaWheelchair,
  FaBaby,
  FaRadiation,
  FaAppleAlt,
  FaFemale,
  FaEye,
  FaBone,
  FaPills,
  FaHeartBroken,
  FaVirus,
  FaTeethOpen,
  FaHospitalUser,
  FaTooth,
  FaUserNurse,
  FaHeadSideVirus,
  FaHeartbeat,
  FaSyringe,
  FaHandsHelping,
  FaLungs,
  FaUserInjured,
} from "react-icons/fa";
import { GiKidneys } from "react-icons/gi";

export interface Category {
  id: number;
  name: string;
  icon: React.ReactNode;
  smallerIcon?: React.ReactNode;
}

export const categories: Category[] = [
  {
    id: 1,
    name: "allergy and clinical immunology",
    icon: <FaVirus className="w-8 h-8" />,
    smallerIcon: <FaVirus className="w-5 h-5" />,
  },
  {
    id: 2,
    name: "anesthesia and intensive care",
    icon: <FaSyringe className="w-8 h-8" />,
    smallerIcon: <FaSyringe className="w-5 h-5" />,
  },
  {
    id: 3,
    name: "audiology and hearing aids",
    icon: <FaDeaf className="w-8 h-8" />,
    smallerIcon: <FaDeaf className="w-5 h-5" />,
  },
  {
    id: 4,
    name: "cardiology",
    icon: <FaHeartbeat className="w-8 h-8" />,
    smallerIcon: <FaHeartbeat className="w-5 h-5" />,
  },
  {
    id: 5,
    name: "cardiovascular surgery",
    icon: <FaHeartbeat className="w-8 h-8" />,
    smallerIcon: <FaHeartbeat className="w-5 h-5" />,
  },
  {
    id: 6,
    name: "dental prosthetics",
    icon: <FaTooth className="w-8 h-8" />,
    smallerIcon: <FaTooth className="w-5 h-5" />,
  },
  {
    id: 7,
    name: "dermatovenerology",
    icon: <FaHandsHelping className="w-8 h-8" />,
    smallerIcon: <FaHandsHelping className="w-5 h-5" />,
  },
  {
    id: 8,
    name: "diabetes, nutrition, and metabolic diseases",
    icon: <FaAppleAlt className="w-8 h-8" />,
    smallerIcon: <FaAppleAlt className="w-5 h-5" />,
  },
  {
    id: 9,
    name: "dietetics",
    icon: <FaAppleAlt className="w-8 h-8" />,
    smallerIcon: <FaAppleAlt className="w-5 h-5" />,
  },
  {
    id: 10,
    name: "emergency medicine",
    icon: <FaAmbulance className="w-8 h-8" />,
    smallerIcon: <FaAmbulance className="w-5 h-5" />,
  },
  {
    id: 11,
    name: "endocrinology",
    icon: <FaDna className="w-8 h-8" />,
    smallerIcon: <FaDna className="w-5 h-5" />,
  },
  {
    id: 12,
    name: "epidemiology",
    icon: <FaVirus className="w-8 h-8" />,
    smallerIcon: <FaVirus className="w-5 h-5" />,
  },
  {
    id: 13,
    name: "family medicine",
    icon: <FaUserMd className="w-8 h-8" />,
    smallerIcon: <FaUserMd className="w-5 h-5" />,
  },
  {
    id: 14,
    name: "gastroenterology",
    icon: <FaStethoscope className="w-8 h-8" />,
    smallerIcon: <FaStethoscope className="w-5 h-5" />,
  },
  {
    id: 15,
    name: "general medicine",
    icon: <FaHospitalUser className="w-8 h-8" />,
    smallerIcon: <FaHospitalUser className="w-5 h-5" />,
  },
  {
    id: 16,
    name: "general surgery",
    icon: <FaSyringe className="w-8 h-8" />,
    smallerIcon: <FaSyringe className="w-5 h-5" />,
  },
  {
    id: 17,
    name: "geriatrics and gerontology",
    icon: <FaWheelchair className="w-8 h-8" />,
    smallerIcon: <FaWheelchair className="w-5 h-5" />,
  },
  {
    id: 18,
    name: "hematology",
    icon: <FaMicroscope className="w-8 h-8" />,
    smallerIcon: <FaMicroscope className="w-5 h-5" />,
  },
  {
    id: 19,
    name: "infectious diseases",
    icon: <FaVirus className="w-8 h-8" />,
    smallerIcon: <FaVirus className="w-5 h-5" />,
  },
  {
    id: 20,
    name: "internal medicine",
    icon: <FaStethoscope className="w-8 h-8" />,
    smallerIcon: <FaStethoscope className="w-5 h-5" />,
  },
  {
    id: 21,
    name: "laboratory medicine",
    icon: <FaMicroscope className="w-8 h-8" />,
    smallerIcon: <FaMicroscope className="w-5 h-5" />,
  },
  {
    id: 22,
    name: "medical expertise",
    icon: <FaUserMd className="w-8 h-8" />,
    smallerIcon: <FaUserMd className="w-5 h-5" />,
  },
  {
    id: 23,
    name: "medical genetics",
    icon: <FaDna className="w-8 h-8" />,
    smallerIcon: <FaDna className="w-5 h-5" />,
  },
  {
    id: 24,
    name: "medical-recovery",
    icon: <FaWheelchair className="w-8 h-8" />,
    smallerIcon: <FaWheelchair className="w-5 h-5" />,
  },
  {
    id: 25,
    name: "neonatology",
    icon: <FaBaby className="w-8 h-8" />,
    smallerIcon: <FaBaby className="w-5 h-5" />,
  },
  {
    id: 26,
    name: "nephrology",
    icon: <GiKidneys className="w-8 h-8" />,
    smallerIcon: <GiKidneys className="w-5 h-5" />,
  },
  {
    id: 27,
    name: "neurosurgery",
    icon: <FaBrain className="w-8 h-8" />,
    smallerIcon: <FaBrain className="w-5 h-5" />,
  },
  {
    id: 28,
    name: "nuclear medicine",
    icon: <FaRadiation className="w-8 h-8" />,
    smallerIcon: <FaRadiation className="w-5 h-5" />,
  },
  {
    id: 29,
    name: "nutrition, diets, lifestyle",
    icon: <FaAppleAlt className="w-8 h-8" />,
    smallerIcon: <FaAppleAlt className="w-5 h-5" />,
  },
  {
    id: 30,
    name: "obstetrics-gynecology",
    icon: <FaFemale className="w-8 h-8" />,
    smallerIcon: <FaFemale className="w-5 h-5" />,
  },
  {
    id: 31,
    name: "oncological surgery",
    icon: <FaSyringe className="w-8 h-8" />,
    smallerIcon: <FaSyringe className="w-5 h-5" />,
  },
  {
    id: 32,
    name: "oncology",
    icon: <FaHeartBroken className="w-8 h-8" />,
    smallerIcon: <FaHeartBroken className="w-5 h-5" />,
  },
  {
    id: 33,
    name: "ophthalmology",
    icon: <FaEye className="w-8 h-8" />,
    smallerIcon: <FaEye className="w-5 h-5" />,
  },
  {
    id: 34,
    name: "oral and maxillofacial surgery",
    icon: <FaTooth className="w-8 h-8" />,
    smallerIcon: <FaTooth className="w-5 h-5" />,
  },
  {
    id: 35,
    name: "orthodontics",
    icon: <FaTeethOpen className="w-8 h-8" />,
    smallerIcon: <FaTeethOpen className="w-5 h-5" />,
  },
  {
    id: 36,
    name: "orthopedics and traumatology",
    icon: <FaBone className="w-8 h-8" />,
    smallerIcon: <FaBone className="w-5 h-5" />,
  },
  {
    id: 37,
    name: "otorhinolaryngology (ent)",
    icon: <FaHeadSideVirus className="w-8 h-8" />,
    smallerIcon: <FaHeadSideVirus className="w-5 h-5" />,
  },
  {
    id: 38,
    name: "pediatric cardiology",
    icon: <FaHeartbeat className="w-8 h-8" />,
    smallerIcon: <FaHeartbeat className="w-5 h-5" />,
  },
  {
    id: 39,
    name: "pediatric gastroenterology",
    icon: <FaStethoscope className="w-8 h-8" />,
    smallerIcon: <FaStethoscope className="w-5 h-5" />,
  },
  {
    id: 40,
    name: "pediatric nephrology",
    icon: <GiKidneys className="w-8 h-8" />,
    smallerIcon: <GiKidneys className="w-5 h-5" />,
  },
  {
    id: 41,
    name: "pediatric neurology",
    icon: <FaBrain className="w-8 h-8" />,
    smallerIcon: <FaBrain className="w-5 h-5" />,
  },
  {
    id: 42,
    name: "pediatric oncology and hematology",
    icon: <FaSyringe className="w-8 h-8" />,
    smallerIcon: <FaSyringe className="w-5 h-5" />,
  },
  {
    id: 43,
    name: "pediatric orthopedics",
    icon: <FaBone className="w-8 h-8" />,
    smallerIcon: <FaBone className="w-5 h-5" />,
  },
  {
    id: 44,
    name: "pediatric psychiatry",
    icon: <FaUserNurse className="w-8 h-8" />,
    smallerIcon: <FaUserNurse className="w-5 h-5" />,
  },
  {
    id: 45,
    name: "pediatric pneumology",
    icon: <FaLungs className="w-8 h-8" />,
    smallerIcon: <FaLungs className="w-5 h-5" />,
  },
  {
    id: 46,
    name: "pediatric surgery",
    icon: <FaSyringe className="w-8 h-8" />,
    smallerIcon: <FaSyringe className="w-5 h-5" />,
  },
  {
    id: 47,
    name: "pediatrics",
    icon: <FaBaby className="w-8 h-8" />,
    smallerIcon: <FaBaby className="w-5 h-5" />,
  },
  {
    id: 48,
    name: "periodontology",
    icon: <FaTeeth className="w-8 h-8" />,
    smallerIcon: <FaTeeth className="w-5 h-5" />,
  },
  {
    id: 49,
    name: "parenting",
    icon: <FaHandsHelping className="w-8 h-8" />,
    smallerIcon: <FaHandsHelping className="w-5 h-5" />,
  },
  {
    id: 50,
    name: "pharmacy",
    icon: <FaPills className="w-8 h-8" />,
    smallerIcon: <FaPills className="w-5 h-5" />,
  },
  {
    id: 51,
    name: "plastic surgery - reconstructive microsurgery",
    icon: <FaUserInjured className="w-8 h-8" />,
    smallerIcon: <FaUserInjured className="w-5 h-5" />,
  },
  {
    id: 52,
    name: "psychiatry",
    icon: <FaBrain className="w-8 h-8" />,
    smallerIcon: <FaBrain className="w-5 h-5" />,
  },
  {
    id: 53,
    name: "psychology",
    icon: <FaBrain className="w-8 h-8" />,
    smallerIcon: <FaBrain className="w-5 h-5" />,
  },
  {
    id: 54,
    name: "radiology and medical imaging",
    icon: <FaXRay className="w-8 h-8" />,
    smallerIcon: <FaXRay className="w-5 h-5" />,
  },
  {
    id: 55,
    name: "radiotherapy",
    icon: <FaRadiation className="w-8 h-8" />,
    smallerIcon: <FaRadiation className="w-5 h-5" />,
  },
  {
    id: 56,
    name: "rheumatology",
    icon: <FaHandsHelping className="w-8 h-8" />,
    smallerIcon: <FaHandsHelping className="w-5 h-5" />,
  },
  {
    id: 57,
    name: "sports medicine",
    icon: <FaRunning className="w-8 h-8" />,
    smallerIcon: <FaRunning className="w-5 h-5" />,
  },
  {
    id: 58,
    name: "thoracic surgery",
    icon: <FaLungs className="w-8 h-8" />,
    smallerIcon: <FaLungs className="w-5 h-5" />,
  },
  {
    id: 59,
    name: "urology",
    icon: <FaToilet className="w-8 h-8" />,
    smallerIcon: <FaToilet className="w-5 h-5" />,
  },
  {
    id: 60,
    name: "vascular surgery",
    icon: <FaHeartbeat className="w-8 h-8" />,
    smallerIcon: <FaHeartbeat className="w-5 h-5" />,
  },
  {
    id: 61,
    name: "veterinary medicine",
    icon: <FaPaw className="w-8 h-8" />,
    smallerIcon: <FaPaw className="w-5 h-5" />,
  },
];