import client from "@/lib/redis";
import { errorHandler } from "@/lib/utils";

import { CityType, ResponseResult } from "@/Types";

export const GetCityListService = async (): Promise<
  ResponseResult<CityType>
> => {
  try {
    const cityList = await client.get("cityList");
    if (!cityList) {
      throw new Error("City List Not Found");
    }
    const result = JSON.parse(cityList!) as string[];
    return {
      success: true,
      data: result.map((item) => ({
        cityName: item,
      })),
    };
  } catch (error: unknown) {
    return errorHandler(error);
  }
};

export const GetCityDetailItem = async (
  citySlugUrl: string,
): Promise<CityType | undefined> => {
  const result = await client.get(`city:${citySlugUrl}`);
  return result ? (JSON.parse(result) as CityType) : undefined;
};

export const GetSiteMapList = async () => {
  const cityKeys = [];
  let cursor = 0;

  // Tüm city:* key'lerini SCAN ile al
  do {
    const result = await client.scan(cursor, {
      MATCH: "city:*",
    });
    cursor = Number(result.cursor);
    cityKeys.push(...result.keys);
  } while (cursor !== 0);

  const values = await client.mGet(cityKeys);

  const keyValuePairs: CityType[] = cityKeys.map((key, index) => {
    return JSON.parse(values[index]!) as CityType;
  });
  console.log(keyValuePairs);
  return keyValuePairs;
};
