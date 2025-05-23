"use client";
import useMediaQuery from "@/Hooks/useMediaQuery";
import { cn, slugifyPharmacyUrl } from "@/lib/utils";
import { CityType } from "@/Types";
import Link from "next/link";
import { usePathname } from "next/navigation";

type LayoutAsideProps = {
  districtList: (string | undefined)[];
  selectedCity: CityType;
};

export default function LayoutAside({
  districtList,
  selectedCity,
}: LayoutAsideProps) {
  const pathName = usePathname();
  const { matches } = useMediaQuery("(max-width:768px)");
  return (
    <aside className="flex-auto md:flex-1/4">
      <nav className="block w-full">
        <ul className="flex w-full flex-col gap-3">
          {districtList.map((item, key) => {
            const linkPathName = slugifyPharmacyUrl({
              cityName: selectedCity.cityName,
              districtName: item,
            });
            return (
              <li key={key}>
                <Link
                  onClick={() => {
                    const elem = document.querySelector(".elemStart");
                    if (elem && matches) {
                      const elementPosition = elem.getBoundingClientRect().top;
                      const offsetPosition = elementPosition - 200;
                      window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth",
                      });
                    }
                  }}
                  title={`${selectedCity?.cityName} ${item} Nöbetçi Eczaneleri`}
                  className={cn(
                    "bg-primary block w-full rounded-md p-3 text-[15px] text-white",
                    linkPathName == pathName && "font-bold underline",
                  )}
                  href={linkPathName}
                >
                  {item!.replace("&nbsp;", " ")} Nöbetçi Eczaneleri
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
