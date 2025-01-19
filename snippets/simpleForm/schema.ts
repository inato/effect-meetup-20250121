import * as yup from "yup";

const schema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string(),
    email: yup.string().email().required(),
    favorite: yup.array(
      yup.string().oneOf(["React", "Angular", "Vue", "Svelte"]).required()
    ),
  })
  .required();

export default schema;

export type Values = yup.InferType<typeof schema>;
