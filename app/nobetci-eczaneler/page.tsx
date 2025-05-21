import CustomSeoTags from "@/Components/Common/CustomSeoTags";
import CityListWrapper from "@/Components/Content/CityListWrapper";
import { env } from "@/lib/utils";
import type { Metadata } from "next";
import Link from "next/link";

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
      <Link href={"/nobetci-eczaneler"}>Deneme</Link>
    </>
  );
}

export const dynamic = "force-dynamic";
