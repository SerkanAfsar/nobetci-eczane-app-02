import { CityType } from "@/Types";
import CityListWithSearch from "./CityListWithSearch";
import CustomAlert from "../Common/CustomAlert";
import { GetCityListService } from "@/Services/City.Service";

export default async function CityListWrapper() {
  const result = await GetCityListService();
  if (!result.success) {
    return <CustomAlert alertMessage={result.error || "Err"} />;
  }
  const data = result.data as CityType[];
  return (
    <section className="bg-primary/5 block w-full py-6">
      <CityListWithSearch cities={data} />
    </section>
  );
}
