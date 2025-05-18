import client from "@/lib/redis";
import { errorHandler } from "@/lib/utils";

import { CityType, ResponseResult } from "@/Types";

export const GetCityListService = async (): Promise<
  ResponseResult<CityType>
> => {
  try {
    const keys = await client.keys("city:*");
    const slugUrlList = await Promise.all(keys.map((key) => client.get(key)));

    return {
      success: true,
      data: (slugUrlList as string[]).map((item) => ({
        cityName: (JSON.parse(item) as CityType).cityName,
      })),
    };
  } catch (error: unknown) {
    return errorHandler(error);
  }
};

export const GetCityDetailItem = async (
  citySlugUrl: string
): Promise<CityType | undefined> => {
  const result = await client.get(`city:${citySlugUrl}`);
  return result ? (JSON.parse(result) as CityType) : undefined;
};
