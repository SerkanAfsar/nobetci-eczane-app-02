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
  citySlugUrl: string
): Promise<CityType | undefined> => {
  const result = await client.get(`city:${citySlugUrl}`);
  return result ? (JSON.parse(result) as CityType) : undefined;
};
