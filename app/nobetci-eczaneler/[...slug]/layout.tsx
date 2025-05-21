import { slugUrl } from "@/lib/utils";
import { GetCityDetailItem } from "@/Services/City.Service";
import { notFound } from "next/navigation";
import LayoutAside from "../Components/LayoutAside";
import LayoutWrapper from "../Components/LayoutWrapper";
import BreadCrumb from "@/Components/Common/BreadCrumb";

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
      <section className="container mx-auto flex h-full items-center justify-center">
        Bu İle Ait Eczaneler Hazırlanıyor
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
