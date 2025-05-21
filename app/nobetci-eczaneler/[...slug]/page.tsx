import CityDetailInfo from "@/Components/Content/CityDetailInfo";
import PharmacyItem from "@/Components/Content/PharmacyItem";
import { slugUrl } from "@/lib/utils";
import { GetCityDetailItem } from "@/Services/City.Service";

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
      {/* <h4 className="bg-primary mb-3 block w-full rounded-md p-3 text-center text-base font-bold text-white uppercase lg:text-left lg:text-lg">
        {new Date().toLocaleString()} {"-"} {result.city.ilAdi}
        {districtName && `- ${districtName}`} Nöbetçi Eczaneleri{" "}
      </h4> */}
      <CityDetailInfo cityName={cityName} districtName={districtName} />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {/* <CustomSeoTags
          cityName={result.city.ilAdi}
          districtName={districtName}
        /> */}

        {pharmacies?.map((item, key) => (
          <PharmacyItem pharmacy={item} key={key} />
        ))}
      </div>
    </>
  );
}

export const dynamic = "force-dynamic";
