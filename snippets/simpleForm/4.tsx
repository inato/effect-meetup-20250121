// @jsx: preserve

import react from "react";
import * as M from "@mantine/core";
import * as RHF from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
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

export default function Form() {
  const { handleSubmit, register, control } = RHF.useForm({
    resolver: yupResolver(schema),
  });
  const { field } = RHF.useController({ name: "favorite", control });

  return (
    <form onSubmit={handleSubmit((_) => console.log(_))}>
      <M.TextInput label="First name" {...register("firstName")} />
      <M.TextInput label="Last name" {...register("lastName")} />
      <M.TextInput label="Email" {...register("email")} />
      <M.MultiSelect data={["React", "Angular", "Vue", "Svelte"]} {...field} />
      <M.Button type="submit">Submit</M.Button>
    </form>
  );
}
