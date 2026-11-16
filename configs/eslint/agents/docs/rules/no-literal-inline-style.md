# `@m-social/agents/no-literal-inline-style`

Disallows hardcoded values in the JSX `style` prop.

A value that is known before the code runs belongs in a stylesheet, where it can use the project's variables, breakpoints and interaction states. The `style` prop stays for values computed at runtime.

The rule reports string and number literals, negative numbers and template literals without `${}` placeholders. It does not look inside a style object passed by reference.

## ❌ Incorrect

```tsx
<p style={{ maxWidth: "600px", marginBottom: 16 }}>…</p>
```

## ✅ Correct

```tsx
<p className={styles.description}>…</p>

<div className={styles.bar} style={{ width: `${progress}%` }} />
<div className={styles.bar} style={{ "--progress": ratio }} />
```
