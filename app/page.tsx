'use client'

import type { State } from "@actions/submitForm.action";
import type { ZippopotamProps } from "@/types/api.types";

import { useState } from "react";
import { useFormState } from "react-dom";
import { SignUpAction } from "@actions/submitForm.action";
import { FormContent } from "@components/formContent.component";
import { PostalCodeData } from "@components/postalCodeData.component";

export default function Home() { 
  const [state, formAction] = useFormState<State, FormData>(SignUpAction, null);
  const [postalCodeData, setPostalCodeData] = useState<ZippopotamProps | undefined>();

  return (
    <main className="p-12 flex justify-center">
      <div className="max-w-[640px]">
        <h1 className="text-heading-l">Postal code look up</h1>
        <p className="text-regular-m">Lets have a cheeky check where that postal code is.</p>
        <form
          name="postal-code-check"
          className="space-y-2 mt-2"
          method="POST"
          action={formAction}
        >
          <FormContent state={state} setResponseData={setPostalCodeData}/>
        </form>
        { postalCodeData && <PostalCodeData data={postalCodeData} /> }
      </div>
    </main>
  );
}
