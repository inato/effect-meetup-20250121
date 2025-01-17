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

```ts
enum LogLevel {
  ERROR,
  WARN,
  INFO,
  DEBUG,
}

/**
 * This is equivalent to:
 * type LogLevelStrings = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';
 */
type LogLevelStrings = keyof typeof LogLevel;

function printImportant(key: LogLevelStrings, message: string) {
  const num = LogLevel[key];
  if (num <= LogLevel.WARN) {
    console.log("Log level key is:", key);
    console.log("Log level value is:", num);
    console.log("Log level message is:", message);
  }
}
printImportant("ERROR", "This is a message");
```