import {
  CustomOptionsType,
  ENV,
  NavbarLinkType,
  Pharmacies,
  ResponseResult,
} from "@/Types";
import clsx from "clsx";
import { ClassValue } from "clsx";
import slugify from "slugify";
import { twMerge } from "tailwind-merge";

export const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(args));
};

export const NavbarLinks: NavbarLinkType[] = [
  {
    link: "/nobetci-eczaneler/istanbul-nobetci-eczaneleri",
    title: "İstanbul Nöbetçi Eczaneleri",
  },
  {
    link: "/nobetci-eczaneler/ankara-nobetci-eczaneleri",
    title: "Ankara Nöbetçi Eczaneleri",
  },
  {
    link: "/nobetci-eczaneler/izmir-nobetci-eczaneleri",
    title: "İzmir Nöbetçi Eczaneleri",
  },
];

export const slugUrl = (value: string): string | null => {
  if (value) {
    return slugify(value, {
      replacement: "-", // replace spaces with replacement character, defaults to `-`
      remove: undefined, // remove characters that match regex, defaults to `undefined`
      lower: true, // convert to lower case, defaults to `false`
      strict: false, // strip special characters except replacement, defaults to `false`
      locale: "tr", // language code of the locale to use
      trim: true, // trim leading and trailing replacement chars, defaults to `true`
    });
  }
  return null;
};

export const slugifyPharmacyUrl = ({
  cityName,
  districtName,
}: {
  cityName: string;
  districtName?: string;
}) => {
  let url = `/nobetci-eczaneler/` + slugUrl(`${cityName} nöbetçi eczaneleri`);
  if (districtName) {
    url += `/${slugUrl(districtName)}`;
  }
  return url;
};

export const errorHandler = (error: unknown): ResponseResult<any> => {
  if (typeof error == "string") {
    return {
      data: null,
      success: false,
      error,
    };
  } else if (error instanceof Error) {
    return {
      data: null,
      success: false,
      error: error.message,
    };
  } else {
    return {
      data: null,
      success: false,
      error: "Something went wrong",
    };
  }
};

export function customTrim(url: string) {
  if (url[url.length - 1] == "-") {
    return url.substring(0, url.length - 1);
  }
  return url;
}

export const env: ENV = {
  SITE_NAME: process.env.NEXT_PUBLIC_SITE_URL!,
};

export function GetCustomOptions<
  T extends object,
  FieldOne extends keyof T,
  FieldTwo extends keyof T,
>(arr: T[], fieldOne: FieldOne, fieldTwo: FieldTwo): CustomOptionsType[] {
  return arr.map((item) => ({
    id: item[fieldOne] as string | number,
    value: item[fieldTwo] as string,
    label: item[fieldTwo] as string,
  }));
}

export function GetDistrictListCustomOptions(
  pharmacyArr: Pharmacies[],
): CustomOptionsType[] {
  const districtList = new Set(pharmacyArr.map((item) => item.districtName));
  const newArr: CustomOptionsType[] = [...districtList].map((item) => ({
    id: item!,
    value: item!,
    label: item!,
  }));

  return GetCustomOptions(newArr, "id", "label");
}
