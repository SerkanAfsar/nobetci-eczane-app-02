import client from "@/lib/redis";
import { customTrim, slugUrl } from "@/lib/utils";
import { CityType, Pharmacies } from "@/Types";
import { parse } from "node-html-parser";

export const getCityList = async () => {
  const response = await fetch(`${process.env.SOURCE_URL}`);
  const result = await response.text();
  const root = parse(result);
  const cityList = root.querySelectorAll(
    "a.btn.btn-outline-secondary.btn-sm.mb-1",
  );
  const arr: string[] = [];
  // cityList.forEach(async (item) => {

  // });
  for (let index = 0; index < cityList.length; index++) {
    const item = cityList[index];

    if (!item || !item.attributes["href"]) {
      return;
    }
    arr.push(item.innerText);
    const hrefValue = customTrim(item.attributes["href"].trim());
    const url = `https://www.nobetcieczanebul.net/${hrefValue}`;
    const pharmacies = await getPharmacyList(url, item.innerText);
    const districtList = [...new Set(pharmacies?.map((a) => a.districtName!))];
    const cityItem: CityType = {
      cityName: item.innerText,
      url: url,
      pharmacies: pharmacies ?? [],
      districtList,
    };
    await client.set(
      `city:${slugUrl(`${item.innerText} nöbetçi eczaneleri`)}`,
      JSON.stringify(cityItem),
    );
  }

  if (!(await client.get("cityList"))) {
    const newArr = [...new Set(arr.map((item) => item.toLocaleLowerCase()))];
    await client.set("cityList", JSON.stringify(newArr));
  }
};

const getPharmacyList = async (url: string, cityName: string) => {
  const arr: Pharmacies[] = [];
  const response = await fetch(url);
  if (!response.ok) {
    return;
  }
  const result = await response.text();
  const root = parse(result);

  const items = root.querySelectorAll("div.card.border-dark.mb-2.btn-sm.w-100");
  // items.forEach((pharmacyItem) => {

  // });
  for (let index = 0; index < items.length; index++) {
    const pharmacyItem = items[index];

    const districtName = pharmacyItem.querySelector("kbd")?.innerText;
    const name = pharmacyItem.querySelector(
      "div:nth-child(2) strong",
    )?.innerText;
    const addressNode = pharmacyItem.querySelector("div:nth-child(3)");
    const linkNode = addressNode?.querySelector("a");
    if (linkNode) {
      addressNode?.removeChild(linkNode);
    }

    const phoneNode = pharmacyItem.querySelector("div:nth-child(4)");
    const linkNodePhone = phoneNode?.querySelector("a");

    if (linkNodePhone) {
      phoneNode?.removeChild(linkNodePhone);
    }

    arr.push({
      address: addressNode?.innerText,
      districtName,
      name,
      phone: phoneNode?.innerText
        .replace("&nbsp", "")
        .trim()
        .replace("Tel:", "")
        .replace("Tel : ", ""),
      cityName,
    });
  }
  return arr;
};
