"use client";
import { useEffect, useState } from "react";

import { useRouter } from "nextjs-toploader/app";
import CustomSelect from "../UI/CustomSelect";
import { CityType, CustomOptionsType } from "@/Types";
import { GetCustomOptions, slugifyPharmacyUrl } from "@/lib/utils";

const customClassNames = {
  control: () =>
    "border rounded-lg w-[230px] p-4 bg-white dark:bg-gray-800 text-sm",
  menu: () => "mt-1 rounded-lg shadow-lg bg-white dark:bg-gray-800 z-10",
  option: ({ isFocused, isSelected }: any) =>
    `cursor-pointer px-4 py-2 ${
      isSelected
        ? "bg-primary text-white"
        : isFocused
          ? "bg-primary text-white"
          : "bg-white dark:bg-gray-800"
    }`,
  singleValue: () => "text-gray-800 dark:text-white",
  input: () => "text-gray-800 dark:text-white",
};
const firstCityItem = { id: "", value: "", label: "Şehir Seçiniz" };
const firstDistrictItem = { id: "", value: "", label: "İlçe Seçiniz" };

export default function HeroSearchSection({
  cityList,
}: {
  cityList: CityType[];
}) {
  const router = useRouter();
  const [selectedCity, setSelectedCity] =
    useState<CustomOptionsType>(firstCityItem);

  const [districtList, setDistrictList] = useState<CustomOptionsType[]>([
    firstDistrictItem,
  ]);
  const [selectedDistrict, setSelectedDistrict] =
    useState<CustomOptionsType>(firstDistrictItem);

  const cityOptionList = [
    firstCityItem,
    ...GetCustomOptions(cityList, "cityName", "cityName"),
  ];

  useEffect(() => {
    const process = async () => {
      setSelectedDistrict(firstDistrictItem);
      const response = await fetch(`/api/districtList`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({ cityName: selectedCity.value }),
      });
      if (response.ok) {
        const result = (await response.json()) as CustomOptionsType[];
        setDistrictList([firstDistrictItem, ...result]);
        setSelectedDistrict(firstDistrictItem);
      } else {
        console.log(response.status);
      }
    };
    process();
  }, [selectedCity]);

  const handleClick = () => {
    if (selectedCity.label) {
      return router.push(
        slugifyPharmacyUrl({
          cityName: selectedCity.label,
          districtName: selectedDistrict.value
            ? selectedDistrict?.label
            : undefined,
        }),
      );
    }
  };

  return (
    <div className="flex max-w-full flex-col justify-between gap-3 rounded-md bg-white p-3 shadow md:flex-row">
      <CustomSelect
        options={cityOptionList}
        placeholder="Sehir Seçiniz"
        classNames={customClassNames}
        onChange={(item) => setSelectedCity(item as CustomOptionsType)}
        unstyled
        noOptionsMessage={() => "Şehir Bulunamadı"}
      />
      <CustomSelect
        options={districtList}
        placeholder="İlçe Seçiniz"
        onChange={(item) => setSelectedDistrict(item as CustomOptionsType)}
        classNames={customClassNames}
        value={selectedDistrict}
        unstyled
        noOptionsMessage={() => "İlçe Bulunamadı"}
      />

      <button
        type="button"
        onClick={handleClick}
        className="bg-primary flex-auto cursor-pointer rounded-md p-3 font-bold text-white uppercase"
      >
        ECZANE ARA
      </button>
    </div>
  );
}
