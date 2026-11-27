# `@m-social/agents-react/no-manual-memoization`

Disallows `useMemo`, `useCallback` and `memo` from `react`.

Part of the oxlint `recommended` and ESLint `recommended/eslint` configs of `@m-social/oxlint-plugin-agents/react`, because M-Social React projects are built with [React Compiler](https://react.dev/learn/react-compiler). The compiler memoizes values, callbacks and components on its own, so manual memoization only adds noise and dependency arrays that can go stale.

A file that starts with the `"use no memo"` directive is skipped: the compiler does not process it, so memoizing by hand is right there.

## ❌ Incorrect

```tsx
import { memo, useCallback, useMemo } from "react";
import * as React from "react";

const total = React.useMemo(() => sum(items), [items]);
```

## ✅ Correct

```tsx
const total = sum(items);

function Card({ title }: Card.Props) {
	const handleClick = () => open(title);

	return <button onClick={handleClick}>{title}</button>;
}
```

## When not to use it

In a project that does not use React Compiler. Switch the rule off after the config:

```js
{ rules: { "@m-social/agents-react/no-manual-memoization": "off" } }
```
