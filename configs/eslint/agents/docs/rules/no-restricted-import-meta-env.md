# `@m-social/agents/no-restricted-import-meta-env`

Disallows reading project variables from `import.meta.env`.

Part of the `vite` config. It is meant for projects that declare their variables in a schema and read them through a typed env module (for example `ENV` from `varlock/env`). That module validates the values and converts them to real booleans and numbers; `import.meta.env` returns raw strings, so `import.meta.env.VITE_FLAG` is `"false"` — a truthy value.

Variables that Vite itself defines stay available.

## ❌ Incorrect

```ts
const apiUrl = import.meta.env.VITE_API_URL;
const { VITE_API_URL } = import.meta.env;
const value = import.meta.env[name];
```

## ✅ Correct

```ts
import { ENV } from "varlock/env";

const apiUrl = ENV.VITE_API_URL;

if (import.meta.env.DEV) {
	// …
}
```

## Options

```ts
{
	// Names that may be read from `import.meta.env`.
	// Default: the Vite built-ins.
	allow: ["BASE_URL", "DEV", "MODE", "PROD", "SSR"];
}
```

## When not to use it

In a project that has no typed env module and reads its variables from `import.meta.env` directly.
