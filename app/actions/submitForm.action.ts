'use server'

import type { ZippopotamProps } from '@/types/api.types';

import { ZodError } from "zod";
import { formDataValidationSchema } from '@utils/validation.util';
import { doFetch } from '@utils/doFetch.util';
import { POSTALCODE_LOOKUP_URL } from '@utils/env.util';

export type State =
  | {
      status: "success" | "error";
      message?: string;
      errors?: Array<{
        path: string;
        message: string;
      }>;
      response?: ZippopotamProps
    }
  | null;
 
export async function SignUpAction(
  prevState: State | null, 
  data: FormData
): Promise<State>{
  // we're gonna put a delay in here to simulate some kind of data processing like persisting data
  await new Promise((resolve) => setTimeout(resolve, 1000));

  let validatedFields;
  try{
    validatedFields = formDataValidationSchema.parse(data);
  }catch(e){
    console.log('error');
    if (e instanceof ZodError) {
      return {
        status: "error",
        message: "Invalid form data",
        errors: e.issues.map(({path, message}) => ({
          path: path.join("."),
          message
        })),
      };
    }

    return {
      status: "error",
      message: "Something went wrong, please try again"
    }
  }
  
  // Do something with the data here like putting it in a DB
  const { country, postalCode } = Object.fromEntries(data);
  
  // fetch data using API
  try{
    const response = await doFetch<ZippopotamProps>(`${POSTALCODE_LOOKUP_URL}/${country}/${postalCode}`);

    return {
      status: "success",
      response
    }
  }catch(e){
    return {
      status: "error",
      message: "Something went wrong, please try again"
    }
  }
}