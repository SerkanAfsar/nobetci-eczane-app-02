export type CityType = {
  cityName: string;
  url?: string;
  pharmacies?: Pharmacies[];
};
export type Pharmacies = {
  districtName?: string;
  name?: string;
  address?: string;
  phone?: string;
  cityName?: string;
};

export type ResponseResult<T> = {
  data: T | T[] | null;
  success: boolean;
  error?: string;
};
export type LinkUrlType =
  | `/nobetci-eczaneler/${string}`
  | `/nobetci-eczaneler/${string}/${string}`;

export type NavbarLinkType = {
  title: string;
  link: LinkUrlType;
};

export type ENV = {
  SITE_NAME: string;
};
