'use client';

import dynamic from 'next/dynamic';
import { forwardRef } from 'react';
import { AsyncSelectInput } from '../AsyncSelectInput.component';
import { AsyncSelectInputProps } from '@/types/form.types';

export interface PostalCodeSelectProps extends AsyncSelectInputProps {
  country?: string;
}

// Create a textInput component for the postal code that we can also use as a loading state
export const PostalCodeSelect = forwardRef<any, PostalCodeSelectProps>(
  ({ ...props }, ref) => {
    // We need to dynamicly load mapBox since it uses window.document
    const DynamicPostalCodeSearch = dynamic(
      () => import('./PostalCodeSearch.component').then(({ PostalCodeSearch }) => PostalCodeSearch),
      {
        ssr: false,
        loading: () => (
          <AsyncSelectInput
            {...props}
            isDisabled={true}
          />
        )
      }
    )

    return (
      <DynamicPostalCodeSearch {...props} forwardedRef={ref} />
    )
  }
);
