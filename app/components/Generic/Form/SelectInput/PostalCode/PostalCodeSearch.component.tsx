'use client';

import type { OptionProps, Options, NoticeProps } from "react-select";

import { components } from "react-select"
import { PostalCodeSelectProps } from "./PostalCodeSelect.component"
import { AsyncSelectInput } from "../AsyncSelectInput.component";
import { useSearchBoxCore } from "@mapbox/search-js-react";
import { MAPBOX_TOKEN } from "@/app/utils/env.util";
import { useRef } from "react";

interface PostalCodeSearchOptionProps extends Options<unknown> {
  location: string;
}

const PostalCodeSearchOption = ({ children, ...props }: OptionProps<PostalCodeSearchOptionProps>) => {
  const { data } = props;
  return (
    <components.Option {...props}>
      {children}<br/>
      <span className='text-regular-s text-black/80'>{ data.location }</span>
    </components.Option>
  );
};

const PostalCodeSearchNoOptionsMessage = (props: NoticeProps) => (
    <components.NoOptionsMessage {...props}>
      No results
    </components.NoOptionsMessage>
);

export const PostalCodeSearch = ({
  country,
  ...props
}: PostalCodeSelectProps ) => {
  
  const searchBoxCore = useSearchBoxCore({ accessToken: MAPBOX_TOKEN });

  const searchBoxControllerRef = useRef<AbortController>();
  const loadOptions = async (value: any) => {
    if(searchBoxControllerRef.current) searchBoxControllerRef.current.abort();

    searchBoxControllerRef.current = new AbortController();

    let response;
    try{
      response = await searchBoxCore.suggest(value, {
        sessionToken: 'test',
        types: 'postcode',
        country,
        signal: searchBoxControllerRef.current.signal
      });
    }catch(error){
      return [];
    }

    return response.suggestions.map(({ name: value, place_formatted: location }) => ({
      value,
      location,
      label: value
    }));
  };

  return (
    <AsyncSelectInput
      {...props}
      components={{ 
        Option: PostalCodeSearchOption,
        NoOptionsMessage: PostalCodeSearchNoOptionsMessage
      }}
      loadOptions={loadOptions}
    />
  )
}