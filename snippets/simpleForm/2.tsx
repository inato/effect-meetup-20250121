// @jsx: preserve

import react from "react";
import * as M from "@mantine/core";
import * as RHF from "react-hook-form";

export default function Form() {
  const { handleSubmit, register, control } = RHF.useForm();
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
