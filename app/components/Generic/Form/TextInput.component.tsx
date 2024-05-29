'use client';

import { forwardRef, type InputHTMLAttributes } from 'react';

import { Error } from './Error.component';
import { Label } from './Label.component';

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
({
  label,
  error,
  className = '',
  required,
  disabled,
  ...rest
}, ref): JSX.Element => (
  <Label label={label} required={required} disabled={disabled}>
      <input
        ref={ref}
        type="text"
        className={`
          text-base w-full min-h-[38px]
          p-[2px_8px] border border-gray rounded
          focus-visible:outline-none
          transition-color duration-300 shadow-[0_0_0_2px] shadow-[transparent]
          autofill:!shadow-[0_0_0_2px] autofill:hover:!shadow-[0_0_0_2px]
          autofill:active:!shadow-[0_0_0_2px] autofill:focus-visible:!shadow-[0_0_0_2px]
          autofill:!shadow-transparent autofill:hover:!shadow-transparent
          disabled:cursor-not-allowed disabled:bg-gray-lightest disabled:border-gray-light
          focus-visible:border-[transparent]
          active:border-[transparent]
          ${error ? '!bg-error' : ''}
          ${
            error ? ` 
              focus-visible:shadow-red
              active:shadow-red
              autofill:focus-visible:!shadow-red 
              autofill:active:!shadow-red 
            `
            : `
              focus-visible:shadow-blue
              active:shadow-blue
              autofill:focus-visible:!shadow-blue 
              autofill:active:!shadow-blue 
            `
          }
        `}
        disabled={disabled}
        {...rest}
      />
      <Error error={error} />
    </Label>
)
)