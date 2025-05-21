import CustomSeoTags from "@/Components/Common/CustomSeoTags";
import CityListWrapper from "@/Components/Content/CityListWrapper";
import InfoSection from "@/Components/Content/InfoSection";
import { env } from "@/lib/utils";
import { getCityList } from "@/Services";

import { Metadata } from "next";

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
  // await getCityList();
  return (
    <>
      <CustomSeoTags />
      <InfoSection />
      <CityListWrapper />
    </>
  );
}

export const dynamic = "force-dynamic";
