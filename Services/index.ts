import client from "@/lib/redis";
import { slugUrl } from "@/lib/utils";
import { CityType, Pharmacies } from "@/Types";
import { parse } from "node-html-parser";

export const getCityList = async () => {
  const response = await fetch(`${process.env.SOURCE_URL}`);
  const result = await response.text();
  const root = parse(result);
  const cityList = root.querySelectorAll(
    ".btn.btn-outline-secondary.btn-sm.mb-1"
  );
  cityList.forEach(async (item) => {
    if (!item || !item.attributes["href"]) {
      return;
    }

    const pharmacies = await getPharmacyList(
      `https://www.nobetcieczanebul.net/${item.attributes["href"]}`
    );

    const cityItem: CityType = {
      cityName: item.innerText,
      url: `https://www.nobetcieczanebul.net/${item.attributes["href"]}`,
      pharmacies,
    };
    await client.set(
      `city:${slugUrl(`${item.innerText} nöbetçi eczaneleri`)}`,
      JSON.stringify(cityItem)
    );
  });
};

const getPharmacyList = async (url: string) => {
  const arr: Pharmacies[] = [];
  const response = await fetch(url);
  const result = await response.text();
  const root = parse(result);

  const items = root.querySelectorAll("div.card.border-dark.mb-2.btn-sm.w-100");
  items.forEach((pharmacyItem) => {
    const districtName = pharmacyItem.querySelector("kbd")?.innerText;
    const name = pharmacyItem.querySelector(
      "div:nth-child(2) strong"
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
    });
  });
  return arr;
};
