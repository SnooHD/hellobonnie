export interface ZippopotamProps {
  'post code': string;
  country: string;
  'country abbreviation': string;
  places: {
    'place name': string;
    longitude: string;
    state: string;
    'state abbreviation': string;
    latitude: string;
  }[]
}

export interface NormalizedZippopotamProps {
  postCode: string;
  country: string;
  countryAbbreviation: string;
  places: {
    placeName: string;
    longitude: string;
    state: string;
    stateAbbreviation: string;
    latitude: string;
  }[]
}