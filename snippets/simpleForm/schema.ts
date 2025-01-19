import * as yup from "yup";

export default yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string(),
    email: yup.string().email().required(),
    favorite: yup.array(
      yup.string().oneOf(["React", "Angular", "Vue", "Svelte"]).required()
    ),
  })
  .required();
