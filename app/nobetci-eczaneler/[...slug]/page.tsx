import DynamicImport from "next/dynamic";
import { slugUrl } from "@/lib/utils";
import { GetCityDetailItem } from "@/Services/City.Service";

const CustomSeoTags = DynamicImport(
  () => import("../../../Components/Common/CustomSeoTags"),
);
const CityDetailInfo = DynamicImport(
  () => import("../../../Components/Content/CityDetailInfo"),
);
const PharmacyItem = DynamicImport(
  () => import("../../../Components/Content/PharmacyItem"),
);

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
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
  return (
    <>
      <CustomSeoTags
        cityName={cityDetail?.cityName}
        districtName={districtName}
      />
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
