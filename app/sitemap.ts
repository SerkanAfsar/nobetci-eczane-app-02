import type { MetadataRoute } from "next";
import { GetSiteMapList } from "../Services/City.Service";

import { env, slugifyPharmacyUrl } from "../lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const arr: MetadataRoute.Sitemap = [];

  const result = await GetSiteMapList();

  for (const item of result) {
    arr.push({
      url: `${env.SITE_NAME}${slugifyPharmacyUrl({ cityName: item.cityName })}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    });

    if (item.districtList) {
      for (const district of item.districtList) {
        arr.push({
          url: `${env.SITE_NAME}${slugifyPharmacyUrl({ cityName: item.cityName, districtName: district })}`,
          lastModified: new Date(),
          changeFrequency: "daily",
          priority: 0.7,
        });
      }
    }
  }

  return [
    {
      url: "https://www.nobetcieczanelerim.net",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: "https://www.nobetcieczanelerim.net/nobetci-eczaneler",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.8,
    },
    ...arr,
  ];
}
