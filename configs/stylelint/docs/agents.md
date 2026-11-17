# Style conventions for AI agents

What `agentsConfig()` from `@m-social/stylelint-config/agents` enforces, and why. Every rule message says what to do instead; this page is the longer explanation the rule links to.

The conventions rest on one idea: component styles do not invent values and selectors that the project already has a shared answer for. Colors, font styles, transitions, interaction states, breakpoints and layers come from shared modules, so a design change is made in one place and every component follows.

The files that define those shared answers are exempt, see [Where the rules are switched off](#where-the-rules-are-switched-off).

## Colors

Rules: `color-no-hex`, `color-named`, `function-disallowed-list`, `declaration-property-value-disallowed-list`.

No hex colors, named colors, `rgb()` / `hsl()` or `var(--color-*)` in component styles. Take the color from the shared colors module.

```scss
// ❌
.button {
	color: #000000;
	background-color: white;
	border-color: var(--color-black);
}

// ✅
@use "$shared/ui/styles/colors";

.button {
	color: colors.$text;
	background-color: colors.$white;
	border-color: colors.$black;
}
```

`transparent`, `currentcolor` and `inherit` are not colors of the palette and stay allowed.

## Typography

Rule: `property-disallowed-list`.

No `font`, `font-family`, `font-size`, `font-weight`, `line-height` or `letter-spacing` in component styles. Font styles belong to the typography system; a component picks a text style, it does not define one.

```scss
// ❌
.title {
	font-size: 24px;
	font-weight: 700;
}
```

```tsx
// ✅
<h1 className={cx(typography({ intent: "heading" }), styles.title)}>…</h1>
```

## Transitions

Rule: `property-disallowed-list`.

No `transition*` properties. The shared transition mixin keeps durations and easing consistent.

```scss
// ❌
.link {
	transition: color 0.2s ease;
}

// ✅
.link {
	@include transition.create(color);
}
```

## States

Rule: `selector-pseudo-class-disallowed-list`.

No hand-written `:hover`, `:active`, `:disabled`, `:focus` or `:focus-visible`. The interaction mixins also cover what a bare pseudo-class misses: hover only on devices that can hover, `[data-disabled]` next to `:disabled`, and so on.

```scss
// ❌
.button {
	&:hover {
		opacity: 0.8;
	}
}

// ✅
.button {
	@include interaction.hover {
		opacity: 0.8;
	}
}
```

Structural pseudo-classes such as `:first-child` and pseudo-elements such as `::before` are not affected.

## Breakpoints

Rule: `m-social-agents/no-width-media-query`.

No `@media` queries on width. Use the breakpoint mixins so every component switches layout at the same widths.

```scss
// ❌
.card {
	@media (min-width: 768px) {
		padding: 24px;
	}
}

// ✅
.card {
	@include breakpoints.tablet {
		padding: 24px;
	}
}
```

Other media features — `prefers-reduced-motion`, `print`, `hover` — are not affected.

## Layers

Rule: `declaration-property-value-disallowed-list`.

No numbers in `z-index`. Named layers from the shared stacking module keep the order of overlays in one place.

```scss
// ❌
.modal {
	z-index: 100;
}

// ✅
.modal {
	z-index: stacking.$modal;
}
```

## Selectors

Rule: `selector-max-type`.

No tag selectors. Every styled element gets a class of its own, so styles do not break when a `<p>` becomes a `<div>` and do not leak into nested components.

```scss
// ❌
.card {
	h2 {
		margin: 0;
	}
}

// ✅
.title {
	margin: 0;
}
```

## Modifiers

Rule: `selector-class-pattern`.

A variant is written inside its block with `&_name`, not as a separate class with an underscore. The rule looks only at classes written out in full, so `&_name` itself is never reported.

```scss
// ❌
.card_elevated {
	box-shadow: shadows.$medium;
}

// ✅
.card {
	&_elevated {
		box-shadow: shadows.$medium;
	}
}
```

## `!important`

Rule: `declaration-no-important`.

No `!important`. When a third-party style has to be overridden, the override mixin raises specificity without the cascade problems of `!important`.

```scss
// ❌
.skeleton {
	width: 100% !important;
}

// ✅
.skeleton {
	@include override.override {
		width: 100%;
	}
}
```

## `@use` imports

Rule: `m-social-agents/no-use-alias`.

No `as` in `@use`, including `as *`. With the default namespace `colors` is always `colors`, which keeps styles readable and searchable across the codebase.

```scss
// ❌
@use "$shared/ui/styles/colors" as c;

// ✅
@use "$shared/ui/styles/colors";
```

## Disable comments

Not part of `agentsConfig()`: the main config, `@m-social/stylelint-config`, sets `reportDescriptionlessDisables` and `reportNeedlessDisables` for everyone.

A `stylelint-disable` comment has to say why after `--`, and it is reported once it no longer suppresses anything. A rule that can be switched off silently does not hold.

```scss
// ❌
/* stylelint-disable-next-line color-no-hex */

// ✅
/* stylelint-disable-next-line color-no-hex -- the client's brand color, not part of our palette */
```

## Where the rules are switched off

The shared modules have to contain what the conventions forbid elsewhere. Their locations differ between projects, so they are passed to `agentsConfig()`:

| Option         | Files                                         | Allowed there                                                                 |
| -------------- | --------------------------------------------- | ----------------------------------------------------------------------------- |
| `globalStyles` | global styles and resets                      | tags, fonts, transitions, raw colors, numeric `z-index`, states, `!important` |
| `sharedStyles` | mixins and variables the conventions point to | fonts, transitions, states, width media queries                               |
| `colorTokens`  | variables that wrap color custom properties   | `var(--color-*)`                                                              |
| `typography`   | styles of the typography system               | font properties                                                               |
