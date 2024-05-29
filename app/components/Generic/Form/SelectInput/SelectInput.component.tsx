'use client';

import dynamic from "next/dynamic";
import Select from "react-select";
import { Error } from "../Error.component";
import { Label } from "../Label.component";
import { forwardRef } from "react";
import { SelectInputProps } from "@/types/form.types";

const SelectInputComponent = 
({
  label,
  error,
  forwardedRef,
  ...props
}: SelectInputProps) => (
  <Label label={label}>
    <Select
      ref={forwardedRef}
      {...props}
    />
    <Error
      error={error}
    />
  </Label>
)

// Use React-Select dynamicly to resolve the following issue:
// https://github.com/JedWatson/react-select/issues/5459#issuecomment-1305491021
export const SelectInput = forwardRef<any, SelectInputProps>(
  ({ ...props }, ref) => {

    const DynamicCountrySelect = dynamic(() => Promise.resolve(SelectInputComponent), {
      ssr: false,
      loading: () => (
        <SelectInputComponent
          {...props}
          error={''}
          isDisabled={true}
        />
      )
    })

    return (
      <DynamicCountrySelect {...props} forwardedRef={ref} />
    )
  }
);