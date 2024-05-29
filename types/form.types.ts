import { formValidationSchema } from "@/app/utils/validation.util";
import { UseFormProps } from "react-hook-form";
import { Props } from "react-select";
import { AsyncProps } from "react-select/async";
import { z } from "zod";

// FORM
export type FormValidationSchemaType = z.infer<typeof formValidationSchema>;
export type FormProps = UseFormProps<FormValidationSchemaType>;

// SELECT
export interface SelectOptionProps {
  label: string;
  value: string;
}

interface SelectProps {
  forwardedRef?: any;
  label: string;
  error?: string;
}

export interface SelectInputProps extends Props, SelectProps {}

// ASYNCSELECT
export interface AsyncSelectInputProps extends AsyncProps<any, false, any>, SelectProps {}