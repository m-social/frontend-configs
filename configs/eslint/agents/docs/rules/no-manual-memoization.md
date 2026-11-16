# `@m-social/agents/no-manual-memoization`

Disallows `useMemo`, `useCallback` and `memo` from `react`.

Part of the `reactCompiler` config. Enable it only in projects built with [React Compiler](https://react.dev/learn/react-compiler): the compiler memoizes values, callbacks and components on its own, so manual memoization only adds noise and dependency arrays that can go stale.

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

In a project that does not use React Compiler.
