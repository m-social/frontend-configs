# `@m-social/agents-react/no-template-literal-class-name`

Disallows building the `className` prop with a template literal that has `${}` placeholders.

A template literal prints `undefined` and `false` as text, leaves stray spaces, and cannot take arrays or conditions. A class-name helper — `cx()` from `cva`, `clsx()` — handles all of that.

## ❌ Incorrect

```tsx
<button className={`${styles.button} ${styles[`button_${variant}`]}`} />
<button className={`button ${isActive ? "active" : ""}`} />
```

## ✅ Correct

```tsx
import { cx } from "cva";

<button className={cx(styles.button, styles[`button_${variant}`])} />
<button className={cx("button", isActive && "active")} />
```

A template literal inside the helper call, as in `styles[`button_${variant}`]`, is fine: it picks one class, it does not join several.
