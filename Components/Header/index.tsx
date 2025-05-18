import { GetCityListService } from "@/Services/City.Service";
import HeaderBottom from "./HeaderBottom";
import HeaderTop from "./HeaderTop";
import { CityType } from "@/Types";

export default async function Header() {
  const cityResult = await GetCityListService();
  if (!cityResult.success) {
    throw new Error(cityResult.error || "Hata");
  }
  return (
    <header className="block w-full bg-white">
      <HeaderTop cityList={cityResult.data as CityType[]} />
      <HeaderBottom />
    </header>
  );
}
