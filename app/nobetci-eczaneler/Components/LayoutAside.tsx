import { slugifyPharmacyUrl } from "@/lib/utils";
import { CityType } from "@/Types";
import Link from "next/link";

type LayoutAsideProps = {
  districtList: (string | undefined)[];
  selectedCity: CityType;
};

export default function LayoutAside({
  districtList,
  selectedCity,
}: LayoutAsideProps) {
  return (
    <aside className="flex-auto md:flex-1/4">
      <nav className="block w-full">
        <ul className="flex w-full flex-col gap-3">
          {districtList.map((item, key) => (
            <li key={key}>
              <Link
                title={`${selectedCity?.cityName} ${item} Nöbetçi Eczaneleri`}
                className="bg-primary block w-full rounded-md p-3 text-white"
                href={slugifyPharmacyUrl({
                  cityName: selectedCity.cityName,
                  districtName: item,
                })}
              >
                {item!.replace("&nbsp;", " ")} Nöbetçi Eczaneleri
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
