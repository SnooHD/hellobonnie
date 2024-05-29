'use client'

import type { FormValidationSchemaType, SelectOptionProps } from "@/types/form.types";
import type { State } from "@actions/submitForm.action";
import type { FieldPath } from "react-hook-form";

import { useFormStatus } from "react-dom";
import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { formValidationSchema } from "@utils/validation.util";
import { SelectInput } from "@/app/components/Generic/Form/SelectInput/SelectInput.component";
import { Error } from "@/app/components/Generic/Form/Error.component";
import { Button } from "@components/Generic/Button.component";
import { PostalCodeSelect } from "@/app/components/Generic/Form/SelectInput/PostalCode/PostalCodeSelect.component";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface FormContentProps {
  state: State;
  setResponseData: Dispatch<SetStateAction<any>>
}

export const FormContent = ({ state, setResponseData }: FormContentProps) => {
  const form = useForm<FormValidationSchemaType>({ 
    mode: 'all',
    resolver: zodResolver(formValidationSchema)
  });
  const { control, watch, setError, formState: { errors } } = form;

  const watchCountry = (watch('country') as unknown as SelectOptionProps)?.value;
  const countrySelectOptions = [
    {value: 'DE', label: 'Germany'},
    {value: 'US', label: 'United States'}
  ];

  const { pending } = useFormStatus();
  const [requestError, setRequestError] = useState('');
  useEffect(() => {
    if (!state) {
      return;
    }

    setRequestError('');
    setResponseData(null);

    switch(state.status){
      case 'error':
        if(!state.errors && state.message){
          setRequestError(state.message);
          return;
        }

        state.errors?.forEach(({path, message}) => {
          setError(path as FieldPath<FormValidationSchemaType>, {
            message
          });
        });
        break;
      case 'success':
        if(!state.response) {
          setRequestError("Something went wrong, please try again");
          return;
        }

        setResponseData(state.response);
    }
  }, [state, setError, setResponseData]);

 return (
  <>
    <Controller
      control={control}
      name="country"
      render={({ field }) => 
        <div>
          <SelectInput
            { ...field }
            error={errors["country"]?.message}
            label="Country"
            options={countrySelectOptions}
          />
        </div>
      }
    />
    <Controller
      control={control}
      name="postalCode"
      render={({ field }) => 
        <div>
          <PostalCodeSelect
            { ...field }
            error={errors["postalCode"]?.message}
            country={watchCountry} 
            isDisabled={!watchCountry}
            label="Postal Code"
            placeholder="Search..."
          />
        </div>
      }
    />
    <div>
      <Button disabled={pending} type="submit" className="mt-2">
        {pending ? 'Loading...' : ''}
        {!pending ? 'Submit' : ''}
      </Button>
    </div>
    {pending}
    <Error error={requestError} />
  </>
 )
}