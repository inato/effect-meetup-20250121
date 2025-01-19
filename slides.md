---
theme: seriph
background: /cover2.webp
title: Reinventing html forms
class: text-center
drawings:
  persist: false
transition: slide-left
# enable MDC Syntax: https://sli.dev/features/mdc
mdc: true
---

# Reinventing HTML forms with Effect


---

# A word about our host




<v-click> Inato is a global marketplace </v-click> <v-click> that connects pharmaceutical companies with research sites worldwide</v-click> <v-click>, accelerating clinical trials and improving patient access to innovative treatments.</v-click>

![](/inato.png){width=300px}

---

# At Inato, we build a fair amount of forms

<div class="grid grid-cols-2 gap-12">
  <img src="/form1.png" width=280/>
  <img src="/form2.png" width=280/>
</div>

<v-click>
And forms can be hard sometime...
</v-click>

---

# Fortunately, frameworks exist to make our life easier
<div />

![](/reacthookform.png){width=400px}


![](/mantine.svg){width=400px}


![](/tanstackform.png){width=400px}

---

# And we can choose from many components library
<div />

![](/shadcn.png){width=400px}

![](/mantine.svg){width=400px}

![](/antd.png){width=400px}

---

# A simple example

````md magic-move

```tsx {*}{maxHeight:'50px'}
import * as M from "@mantine/core";
import * as RHF from "react-hook-form";

export default function Form() {
  const { handleSubmit, register } = RHF.useForm();

  return (
    <form onSubmit={handleSubmit((_) => console.log(_))}>
      <M.TextInput label="First name" {...register("firstName")} />
      <M.TextInput label="Last name" {...register("lastName")} />
      <M.TextInput label="Email" {...register("email")} />
      <M.Button type="submit">Submit</M.Button>
    </form>
  );
}
```

<!-- add MultiSelect controlled field -->

```tsx {5,6,13}
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
```

<!-- add validation using Yup -->

```tsx {3-14}
import * as M from "@mantine/core";
import * as RHF from "react-hook-form";
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
```

```tsx {3-9}
import * as M from "@mantine/core";
import * as RHF from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from './schema';

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
```

```tsx {10,14-17}
import * as M from "@mantine/core";
import * as RHF from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from './schema';

export default function Form() {
  const { handleSubmit, register, control, formState: { errors } } = RHF.useForm({
    resolver: yupResolver(schema),
  });
  const { field } = RHF.useController({ name: "favorite", control });

  return (
    <form onSubmit={handleSubmit((_) => console.log(_))}>
      <M.TextInput label="First name" {...register("firstName")} error={errors?.firstName?.message} />
      <M.TextInput label="Last name" {...register("lastName")} error={errors?.lastName?.message} />
      <M.TextInput label="Email" {...register("email")} error={errors?.email?.message} />
      <M.MultiSelect data={["React", "Angular", "Vue", "Svelte"]} {...field} error={errors?.favorite?.message} />
      <M.Button type="submit">Submit</M.Button>
    </form>
  );
}
```

```tsx {5,8,10,15,20}{lines:true}
import * as M from "@mantine/core";
import * as RHF from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from './schema';
import * as API from "./api";

export default function Form() {
  const { handleSubmit, register, control, formState: { errors, isSubmitting } } = RHF.useForm({
    resolver: yupResolver(schema),
    defaultValues: API.getFromApi,
  });
  const { field } = RHF.useController({ name: "favorite", control });

  return (
    <form onSubmit={handleSubmit(API.sendToApi)}>
      <M.TextInput label="First name" {...register("firstName")} error={errors?.firstName?.message} />
      <M.TextInput label="Last name" {...register("lastName")} error={errors?.lastName?.message} />
      <M.TextInput label="Email" {...register("email")} error={errors?.email?.message} />
      <M.MultiSelect data={["React", "Angular", "Vue", "Svelte"]} {...field} error={errors?.favorite?.message} />
      <M.Button type="submit" loading={isSubmitting}>Submit</M.Button>
    </form>
  );
}
```
````
