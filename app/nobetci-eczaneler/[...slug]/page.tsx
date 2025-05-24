import DynamicImport from "next/dynamic";
import { env, slugifyPharmacyUrl, slugUrl } from "@/lib/utils";
import { GetCityDetailItem } from "@/Services/City.Service";
import { Metadata } from "next";

const CustomSeoTags = DynamicImport(
  () => import("../../../Components/Common/CustomSeoTags"),
);
const CityDetailInfo = DynamicImport(
  () => import("../../../Components/Content/CityDetailInfo"),
);
const PharmacyItem = DynamicImport(
  () => import("../../../Components/Content/PharmacyItem"),
);

const getDistrictAndCityName = async (slug: string[]) => {
  const cityDetail = await GetCityDetailItem(slug[0]);
  let pharmacies = cityDetail?.pharmacies;
  if (slug.length == 2) {
    pharmacies = pharmacies?.filter((a) => slugUrl(a.districtName!) == slug[1]);
  }
  const cityName = cityDetail?.cityName ?? "";
  const districtName =
    slug.length == 2 && pharmacies?.length
      ? pharmacies[0].districtName
      : undefined;
  return {
    cityName,
    districtName,
    pharmacies,
  };
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { cityName, districtName } = await getDistrictAndCityName(slug);
  const value = districtName
    ? `${cityName} ${districtName} Nöbetçi Eczaneleri`
    : `${cityName} Nöbetçi Eczaneleri`;

  const url = `${env.SITE_NAME}${slugifyPharmacyUrl({ cityName, districtName })}`;

  return {
    title: value,
    description: `${value} | ${value} Adres ve Telefon Numaraları`,
    robots: "index,follow",
    publisher: "Nöbetçi Eczane",
    authors: [
      {
        name: "Nöbetçi Eczane",
        url: env.SITE_NAME,
      },
    ],

    openGraph: {
      title: value,
      description: `${value} | ${value} Adres ve Telefon Numaraları`,
      url,
      locale: "tr_TR",
      siteName: "Nöbetçi Eczane",
      authors: ["Nöbetçi Eczane"],
      emails: ["info@nobetcieczanelistesi.org"],
    },

    twitter: {
      card: "summary",
      description: `${value} | ${value} Adres ve Telefon Numaraları`,
      title: value,
      creator: "@nobetcieczane",
    },

    alternates: {
      canonical: url,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;

  const { cityName, districtName, pharmacies } =
    await getDistrictAndCityName(slug);
  return (
    <>
      <CustomSeoTags cityName={cityName} districtName={districtName} />
      <CityDetailInfo cityName={cityName} districtName={districtName} />
      <div className="pharmacyList grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {pharmacies?.map((item, key) => (
          <PharmacyItem pharmacy={item} key={key} />
        ))}
      </div>
    </>
  );
}

export const dynamic = "force-dynamic";
