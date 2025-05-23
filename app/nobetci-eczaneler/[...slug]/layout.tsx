import dynamic from "next/dynamic";
import { slugUrl } from "@/lib/utils";
import { GetCityDetailItem } from "@/Services/City.Service";
import { notFound } from "next/navigation";

const LayoutAside = dynamic(() => import("../Components/LayoutAside"));
const LayoutWrapper = dynamic(() => import("../Components/LayoutWrapper"));
const BreadCrumb = dynamic(
  () => import("../../../Components/Common/BreadCrumb"),
);

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ slug: string[] }>;
  children: React.ReactNode;
}) {
  const { slug } = await params;

  const selectedCity = await GetCityDetailItem(slug[0]);

  if (!selectedCity) {
    return notFound();
  }

  const districtList = [
    ...new Set(selectedCity?.pharmacies?.map((a) => a.districtName)),
  ];

  const districtUrl = slug[1];

  const selectedDistrict = districtList.find((a) => slugUrl(a!) == districtUrl);

  const districtExists = districtUrl && districtList.length && selectedDistrict;

  if (districtUrl && !districtExists) {
    return notFound();
  }
  if (!selectedCity.pharmacies?.length) {
    return (
      <section className="bg-primary flex h-full flex-auto items-center justify-center py-4 text-center text-white">
        <h1 className="text-2xl font-semibold text-white uppercase">
          {`"${selectedCity.cityName}"`} İline Ait Eczaneler Hazırlanmaktadır..
        </h1>
      </section>
    );
  }

  return (
    <section className="container mx-auto">
      <BreadCrumb
        selectedCity={selectedCity}
        selectedDistrict={selectedDistrict}
      />
      <div className="my-6 flex w-full flex-col gap-6 lg:flex-row">
        <LayoutAside districtList={districtList} selectedCity={selectedCity} />
        <LayoutWrapper>{children}</LayoutWrapper>
      </div>
    </section>
  );
}
