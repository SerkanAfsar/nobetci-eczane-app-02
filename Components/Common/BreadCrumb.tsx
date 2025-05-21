import { cn, slugifyPharmacyUrl } from "@/lib/utils";
import { CityType } from "@/Types";
import Link from "next/link";

export type BreadCrumProps = {
  selectedCity: CityType;
  selectedDistrict?: string;
};
export default function BreadCrumb({
  selectedCity,
  selectedDistrict,
}: BreadCrumProps) {
  return (
    <div className="my-6 flex w-full flex-auto items-center justify-between capitalize">
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
                "after:relative after:pl-1 after:content-['>']",
            )}
          >
            <Link
              href={slugifyPharmacyUrl({ cityName: selectedCity.cityName })}
              title={`${selectedCity.cityName} Nöbetçi Eczaneleri`}
            >
              {selectedCity.cityName}
            </Link>
          </li>
          {selectedDistrict && (
            <li>
              <Link
                href={slugifyPharmacyUrl({
                  cityName: selectedCity.cityName,
                  districtName: selectedDistrict,
                })}
                title={`${selectedCity.cityName} ${selectedDistrict} Nöbetçi Eczaneleri`}
              >
                {selectedDistrict}
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}
