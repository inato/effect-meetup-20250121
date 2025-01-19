// @jsx: preserve

import react from "react";
import * as M from "@mantine/core";
import * as RHF from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema, { type Values } from "./schema";
import * as API from "./api";

function UserInfo() {
  const {
    register,
    formState: { errors },
  } = RHF.useFormContext<Values>();
  return (
    <>
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
    </>
  );
}

function UserPreferences() {
  const {
    watch,
    formState: { errors },
  } = RHF.useFormContext<Values>();
  const { field } = RHF.useController<Values>({ name: "favorite" });
  field.value;
  const favoriteValue = watch("favorite");
  const showMessage = favoriteValue?.includes("Angular");

  return (
    <>
      <M.MultiSelect
        data={["React", "Angular", "Vue", "Svelte"]}
        {...field}
        error={errors?.favorite?.message}
      />
      {showMessage && <M.Alert>Really? Still in 2025?</M.Alert>}
    </>
  );
}

export default function Form() {
  const formMethods = RHF.useForm({
    resolver: yupResolver(schema),
    defaultValues: API.getFromApi,
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = formMethods;
  return (
    <RHF.FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(API.sendToApi)}>
        <UserInfo />
        <UserPreferences />
        <M.Button
          type="reset"
          onClick={() =>
            reset({ firstName: "", lastName: "", email: "", favorite: [] })
          }
        >
          Clear
        </M.Button>
        <M.Button type="submit" loading={isSubmitting}>
          Submit
        </M.Button>
      </form>
    </RHF.FormProvider>
  );
}
