import dynamic from "next/dynamic";
import { env } from "@/lib/utils";
import type { Metadata } from "next";

const CustomSeoTags = dynamic(
  () => import("../../Components/Common/CustomSeoTags"),
);

const CityListWrapper = dynamic(
  () => import("../../Components/Content/CityListWrapper"),
);

export const metadata: Metadata = {
  title: "Türkiye İl İlçe Nöbetçi Eczane Listesi",
  description: "Türkiye İl İlçe Nöbetçi Eczane Numaraları",
  robots: "index,follow",
  publisher: "Nöbetçi Eczane",
  authors: [
    {
      name: "Nöbetçi Eczane",
      url: `${env.SITE_NAME}/nobetci-eczaneler`,
    },
  ],

  openGraph: {
    title: "Türkiye İl İlçe Nöbetçi Eczane Listesi",
    description: "Türkiye İl İlçe Nöbetçi Eczane Numaraları",
    url: `${env.SITE_NAME}/nobetci-eczaneler`,
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
    canonical: `${env.SITE_NAME}/nobetci-eczaneler`,
  },
};

export default function Page() {
  return (
    <>
      <CustomSeoTags />
      <CityListWrapper />
    </>
  );
}
