import dynamicImport from "next/dynamic";
import { env } from "@/lib/utils";
import { Metadata } from "next";

const CustomSeoTags = dynamicImport(
  () => import("../Components/Common/CustomSeoTags"),
);
const CityListWrapper = dynamicImport(
  () => import("../Components/Content/CityListWrapper"),
);
const HeroSection = dynamicImport(
  () => import("../Components/Content/HeroSection"),
);
const InfoSection = dynamicImport(
  () => import("../Components/Content/InfoSection"),
);

export const metadata: Metadata = {
  title: "Türkiye İl İlçe Nöbetçi Eczane Listesi",
  description: "Türkiye İl İlçe Nöbetçi Eczane Numaraları",
  robots: "index,follow",
  publisher: "Nöbetçi Eczane",
  authors: [
    {
      name: "Nöbetçi Eczane",
      url: env.SITE_NAME,
    },
  ],

  openGraph: {
    title: "Türkiye İl İlçe Nöbetçi Eczane Listesi",
    description: "Türkiye İl İlçe Nöbetçi Eczane Numaraları",
    url: env.SITE_NAME,
    locale: "tr_TR",
    siteName: "Nöbetçi Eczane",
    authors: ["Nöbetçi Eczane"],
    emails: ["info@nobetcieczanelistesi.org"],
  },

  twitter: {
    card: "summary",
    description: "Türkiye İl - İlçe Nöbetçi Eczane Listesi",
    title: "Türkiye İl - İlçe Nöbetçi Eczane Listesi",
    creator: "@nobetcieczane",
  },

  alternates: {
    canonical: env.SITE_NAME,
  },
};

export default async function Home() {
  return (
    <>
      <CustomSeoTags />
      <HeroSection />
      <InfoSection />
      <CityListWrapper />
    </>
  );
}

export const dynamic = "force-dynamic";
