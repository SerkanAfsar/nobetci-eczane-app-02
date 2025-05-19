import { slugUrl } from "@/lib/utils";
import { GetCityDetailItem } from "@/Services/City.Service";
import { notFound } from "next/navigation";
import LayoutAside from "../Components/LayoutAside";
import LayoutWrapper from "../Components/LayoutWrapper";

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

  const districtExists =
    districtUrl &&
    districtList.length &&
    districtList.find((a) => slugUrl(a!) == districtUrl);

  if (districtUrl && !districtExists) {
    return notFound();
  }

  return (
    <section className="container mx-auto">
      {/* <div className="my-6 flex w-full flex-auto items-center justify-between">
        <nav className="block w-full">
          <ul className="flex flex-wrap items-center justify-start gap-1 font-bold md:flex-row">
            <li className="after: relative after:pl-1 after:content-['>']">
              <Link href={"/"} title="Anasayfa">
                Anasayfa
              </Link>
            </li>
            <li className="after: relative after:pl-1 after:content-['>']">
              <Link href={"/nobetci-eczaneler"} title="Nöbetçi Eczaneler">
                Nöbetçi Eczaneler
              </Link>
            </li>
            <li
              className={cn(
                selectedDistrict &&
                  "after:relative after:pl-1 after:content-['>']"
              )}
            >
              <Link
                href={`/nobetci-eczaneler/${result.city.seoUrl}`}
                title={`${result.city.ilAdi} Nöbetçi Eczaneleri`}
              >
                {result.city.ilAdi}
              </Link>
            </li>
            {selectedDistrict && (
              <li>
                <Link
                  href={`/nobetci-eczaneler/${result.city.seoUrl}/${slugUrl(
                    selectedDistrict
                  )}`}
                  title={`${result.city.ilAdi} ${selectedDistrict} Nöbetçi Eczaneleri`}
                >
                  {selectedDistrict}
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div> */}
      <div className="my-6 flex w-full flex-col gap-6 lg:flex-row">
        <LayoutAside districtList={districtList} selectedCity={selectedCity} />
        <LayoutWrapper>{children}</LayoutWrapper>
      </div>
    </section>
  );
}
