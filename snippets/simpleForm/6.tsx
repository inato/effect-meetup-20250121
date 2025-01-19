// @jsx: preserve

import react from "react";
import * as M from "@mantine/core";
import * as RHF from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "./schema";
import * as API from "./api";

export default function Form() {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = RHF.useForm({
    resolver: yupResolver(schema),
    defaultValues: API.getFromApi,
  });
  const { field } = RHF.useController({ name: "favorite", control });

  return (
    <form onSubmit={handleSubmit(API.sendToApi)}>
      <M.TextInput
        label="First name"
        {...register("firstName")}
        error={errors?.firstName?.message}
      />
      <M.TextInput
        label="Last name"
        {...register("lastName")}
        error={errors?.lastName?.message}
      />
      <M.TextInput
        label="Email"
        {...register("email")}
        error={errors?.email?.message}
      />
      <M.MultiSelect
        data={["React", "Angular", "Vue", "Svelte"]}
        {...field}
        error={errors?.favorite?.message}
      />
      <M.Button type="submit" loading={isSubmitting}>
        Submit
      </M.Button>
    </form>
  );
}
