# @m-social/frontend-configs

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

> Shareable configurations for code quality tools used at [M-Social](https://msocialproduction.com)

A monorepo containing all frontend linting, formatting, and code quality configurations used across M-Social projects.

## 📦 Packages

### Oxlint Configuration

- **[@m-social/oxlint-config](./configs/oxlint)** - Oxlint configuration for high-performance linting

### ESLint Configurations

> **Note:** ESLint configurations are designed to be used alongside [@m-social/oxlint-config](./configs/oxlint). ESLint handles rules not yet supported by oxlint, while oxlint handles the rest for improved linting performance.

- **[@m-social/eslint-config-react](./configs/eslint/react)** - ESLint configuration for React projects
- **[@m-social/eslint-config-svelte](./configs/eslint/svelte)** - ESLint configuration for Svelte projects

### Prettier Configurations

- **[@m-social/prettier-config](./configs/prettier/base)** - Base Prettier configuration
- **[@m-social/prettier-config-react](./configs/prettier/react)** - Prettier configuration for React projects
- **[@m-social/prettier-config-svelte](./configs/prettier/svelte)** - Prettier configuration for Svelte projects

### Oxfmt Configuration

- **[@m-social/oxfmt-config](./configs/oxfmt)** - Oxfmt configuration for high-performance formatting (with React and Svelte variants)
  - ⚠️ **Experimental** - Oxfmt is in beta for now

### Biome Configuration

- **[@m-social/biome-config](./configs/biome)** - Biome configuration for fast formatting (with React and Svelte variants)
  - ⚠️ **Experimental** - Currently supports formatting only

### CSpell Configuration

- **[@m-social/cspell-config](./configs/cspell)** - Shareable CSpell configuration for spell checking TypeScript projects

### Stylelint Configuration

- **[@m-social/stylelint-config](./configs/stylelint)** - Shareable Stylelint configuration for style linting in TypeScript projects

## 🚀 Quick Start

Choose the appropriate configuration for your project stack:

### Shared Configuration

These configurations apply to all project stacks regardless of framework.

#### Spell Checking

```bash
pnpm add -D cspell @m-social/cspell-config
```

See [@m-social/cspell-config](./configs/cspell) for usage instructions.

#### Style Linting

```bash
pnpm add -D stylelint @m-social/stylelint-config
```

See [@m-social/stylelint-config](./configs/stylelint) for usage instructions.

---

### TypeScript Project

#### Formatting

**Option 1: Prettier (Recommended)**

```bash
pnpm add -D prettier @m-social/prettier-config
```

See [@m-social/prettier-config](./configs/prettier/base) for usage instructions.

**Option 2: Oxfmt (Experimental)**

```bash
pnpm add -D oxfmt @m-social/oxfmt-config
```

See [@m-social/oxfmt-config](./configs/oxfmt) for usage instructions.

**Option 3: Biome (Experimental)**

```bash
pnpm add -D @biomejs/biome @m-social/biome-config
```

See [@m-social/biome-config](./configs/biome) for usage instructions.

#### Linting

**Oxlint**

```bash
pnpm add -D oxlint oxlint-tsgolint @m-social/oxlint-config
```

See [@m-social/oxlint-config](./configs/oxlint) for usage instructions.

---

### Svelte Project

#### Formatting

**Option 1: Prettier (Recommended)**

```bash
pnpm add -D prettier @m-social/prettier-config-svelte
```

See [@m-social/prettier-config-svelte](./configs/prettier/svelte) for usage instructions.

**Option 2: Oxfmt (Experimental)**

```bash
pnpm add -D oxfmt @m-social/oxfmt-config
```

See [@m-social/oxfmt-config](./configs/oxfmt) for usage instructions.

> ⚠️ **Note:** oxfmt does not currently support `.svelte` files. This config can be used for `.svelte.ts` and `.svelte.js` files. For `.svelte` files, use Prettier (Option 1).

**Option 3: Biome (Experimental)**

```bash
pnpm add -D @biomejs/biome @m-social/biome-config
```

See [@m-social/biome-config](./configs/biome) for usage instructions.

#### Linting

**Oxlint + ESLint**

```bash
pnpm add -D oxlint oxlint-tsgolint @m-social/oxlint-config eslint @m-social/eslint-config-svelte
```

See [@m-social/oxlint-config](./configs/oxlint) and [@m-social/eslint-config-svelte](./configs/eslint/svelte) for usage instructions.

---

### React Project

#### Formatting

**Option 1: Prettier (Recommended)**

```bash
pnpm add -D prettier @m-social/prettier-config-react
```

See [@m-social/prettier-config-react](./configs/prettier/react) for usage instructions.

**Option 2: Oxfmt (Experimental)**

```bash
pnpm add -D oxfmt @m-social/oxfmt-config
```

See [@m-social/oxfmt-config](./configs/oxfmt) for usage instructions.

**Option 3: Biome (Experimental)**

```bash
pnpm add -D @biomejs/biome @m-social/biome-config
```

See [@m-social/biome-config](./configs/biome) for usage instructions.

#### Linting

**Oxlint + ESLint**

```bash
pnpm add -D oxlint oxlint-tsgolint @m-social/oxlint-config eslint @m-social/eslint-config-react
```

See [@m-social/oxlint-config](./configs/oxlint) and [@m-social/eslint-config-react](./configs/eslint/react) for usage instructions.

---

### Next.js Project

#### Formatting

**Option 1: Prettier (Recommended)**

```bash
pnpm add -D prettier @m-social/prettier-config-react
```

See [@m-social/prettier-config-react](./configs/prettier/react) for usage instructions.

**Option 2: Oxfmt (Experimental)**

```bash
pnpm add -D oxfmt @m-social/oxfmt-config
```

See [@m-social/oxfmt-config](./configs/oxfmt) for usage instructions.

**Option 3: Biome (Experimental)**

```bash
pnpm add -D @biomejs/biome @m-social/biome-config
```

See [@m-social/biome-config](./configs/biome) for usage instructions.

#### Linting

**Oxlint + ESLint**

```bash
pnpm add -D oxlint oxlint-tsgolint @m-social/oxlint-config eslint @m-social/eslint-config-react
```

See [@m-social/oxlint-config](./configs/oxlint) and [@m-social/eslint-config-react](./configs/eslint/react) for usage instructions.

---

## 📁 Repository Structure

```
configs/
├── eslint/
│   ├── react/          # @m-social/eslint-config-react
│   └── svelte/         # @m-social/eslint-config-svelte
├── prettier/
│   ├── base/           # @m-social/prettier-config
│   ├── react/          # @m-social/prettier-config-react
│   ├── svelte/         # @m-social/prettier-config-svelte
│   └── utils/          # Shared utilities
├── oxfmt/              # @m-social/oxfmt-config
├── biome/              # @m-social/biome-config
├── oxlint/             # @m-social/oxlint-config
├── cspell/             # @m-social/cspell-config
└── stylelint/          # @m-social/stylelint-config
```

## 🛠️ Development

This monorepo uses pnpm workspaces for package management.

### Prerequisites

We recommend using [proto](https://moonrepo.dev/proto) to manage Node.js and pnpm versions. Proto will automatically load the correct versions defined in the project configuration.

```bash
# Install proto (if not already installed)
curl -fsSL https://moonrepo.dev/install/proto.sh | bash

# Install and use the project's Node.js and pnpm versions
proto use
```

Alternatively, ensure you have Node.js 24 and pnpm installed manually.

### Commands

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Lint all packages
pnpm lint

# Format all packages
pnpm format
```

## 📖 Documentation

Each package contains its own README with detailed usage instructions. Navigate to the specific package directory for more information.

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting a pull request.

## 📄 License

MIT © M-Social
