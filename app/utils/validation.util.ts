import { zfd } from "zod-form-data";
import { z } from "zod";

const ReactSelectSchema = {
    value: z.string(),
    label: z.string()
}
export const formDataValidationSchema = zfd.formData({
    country: zfd.text(z.string({message: "Country is required"})),
    postalCode: zfd.text(z.string({ message: "Postal code is required"}))
});

export const formValidationSchema = z.object({
  country: z.object(ReactSelectSchema, {message: "Country is required"}),
  postalCode: z.object(ReactSelectSchema, { message: "Postal code is required"})
});