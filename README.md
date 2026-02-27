# @m-social/frontend-configs

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

> Shareable configurations for code quality tools used at [M-Social](https://msocialproduction.com)

A monorepo containing all frontend linting, formatting, and code quality configurations used across M-Social projects.

## 📦 Packages

### ESLint Configurations

- **[@m-social/eslint-config-typescript](./configs/eslint/typescript)** - ESLint configuration for TypeScript projects
- **[@m-social/eslint-config-react](./configs/eslint/react)** - ESLint configuration for React projects
- **[@m-social/eslint-config-svelte](./configs/eslint/svelte)** - ESLint configuration for Svelte projects
- **[@m-social/eslint-config-next](./configs/eslint/next)** - ESLint configuration for Next.js projects

### Prettier Configurations

- **[@m-social/prettier-config](./configs/prettier/base)** - Base Prettier configuration
- **[@m-social/prettier-config-react](./configs/prettier/react)** - Prettier configuration for React projects
- **[@m-social/prettier-config-svelte](./configs/prettier/svelte)** - Prettier configuration for Svelte projects

### Biome Configuration

- **[@m-social/biome-config](./configs/biome)** - Biome configuration for fast formatting (with React and Svelte variants)
  - ⚠️ **Experimental** - Currently supports formatting only

### Oxlint Configuration

- **[@m-social/oxlint-config](./configs/oxlint)** - Oxlint configuration for high-performance linting
  - ⚠️ **Experimental** - Can be used alongside ESLint for improved performance

### CSpell Configuration

- **[@m-social/cspell-config](./configs/cspell)** - Shareable CSpell configuration for spell checking TypeScript projects

## 🚀 Quick Start

Choose the appropriate configuration for your project stack:

### Shared Configuration

These configurations apply to all project stacks regardless of framework.

#### Spell Checking

```bash
pnpm add -D cspell @m-social/cspell-config
```

See [@m-social/cspell-config](./configs/cspell) for usage instructions.

---

### TypeScript Project

#### Formatting

**Option 1: Prettier (Recommended)**

```bash
pnpm add -D prettier @m-social/prettier-config
```

See [@m-social/prettier-config](./configs/prettier/base) for usage instructions.

**Option 2: Biome (Experimental)**

```bash
pnpm add -D @biomejs/biome @m-social/biome-config
```

See [@m-social/biome-config](./configs/biome) for usage instructions.

#### Linting

**ESLint (Recommended)**

```bash
pnpm add -D eslint @m-social/eslint-config-typescript
```

See [@m-social/eslint-config-typescript](./configs/eslint/typescript) for usage instructions.

**Optional: Add Oxlint for improved performance (Experimental)**

Oxlint can be used alongside ESLint for faster linting on larger codebases.

```bash
pnpm add -D oxlint oxlint-tsgolint @m-social/oxlint-config eslint-plugin-oxlint
```

See [@m-social/oxlint-config](./configs/oxlint) for usage instructions and ESLint integration setup.

---

### Svelte Project

#### Formatting

**Option 1: Prettier (Recommended)**

```bash
pnpm add -D prettier @m-social/prettier-config-svelte
```

See [@m-social/prettier-config-svelte](./configs/prettier/svelte) for usage instructions.

**Option 2: Biome (Experimental)**

```bash
pnpm add -D @biomejs/biome @m-social/biome-config
```

See [@m-social/biome-config](./configs/biome) for usage instructions.

#### Linting

**ESLint (Recommended)**

```bash
pnpm add -D eslint @m-social/eslint-config-svelte
```

See [@m-social/eslint-config-svelte](./configs/eslint/svelte) for usage instructions.

**Optional: Add Oxlint for improved performance (Experimental)**

Oxlint can be used alongside ESLint for faster linting on larger codebases.

```bash
pnpm add -D oxlint oxlint-tsgolint @m-social/oxlint-config eslint-plugin-oxlint
```

See [@m-social/oxlint-config](./configs/oxlint) for usage instructions and ESLint integration setup.

---

### React Project

#### Formatting

**Option 1: Prettier (Recommended)**

```bash
pnpm add -D prettier @m-social/prettier-config-react
```

See [@m-social/prettier-config-react](./configs/prettier/react) for usage instructions.

**Option 2: Biome (Experimental)**

```bash
pnpm add -D @biomejs/biome @m-social/biome-config
```

See [@m-social/biome-config](./configs/biome) for usage instructions.

#### Linting

**ESLint (Recommended)**

```bash
pnpm add -D eslint @m-social/eslint-config-react
```

See [@m-social/eslint-config-react](./configs/eslint/react) for usage instructions.

**Optional: Add Oxlint for improved performance (Experimental)**

Oxlint can be used alongside ESLint for faster linting on larger codebases.

```bash
pnpm add -D oxlint oxlint-tsgolint @m-social/oxlint-config eslint-plugin-oxlint
```

See [@m-social/oxlint-config](./configs/oxlint) for usage instructions and ESLint integration setup.

---

### Next.js Project

#### Formatting

**Option 1: Prettier (Recommended)**

```bash
pnpm add -D prettier @m-social/prettier-config-react
```

See [@m-social/prettier-config-react](./configs/prettier/react) for usage instructions.

**Option 2: Biome (Experimental)**

```bash
pnpm add -D @biomejs/biome @m-social/biome-config
```

See [@m-social/biome-config](./configs/biome) for usage instructions.

#### Linting

**ESLint (Recommended)**

```bash
pnpm add -D eslint @m-social/eslint-config-next
```

See [@m-social/eslint-config-next](./configs/eslint/next) for usage instructions.

**Optional: Add Oxlint for improved performance (Experimental)**

Oxlint can be used alongside ESLint for faster linting on larger codebases.

```bash
pnpm add -D oxlint oxlint-tsgolint @m-social/oxlint-config eslint-plugin-oxlint
```

See [@m-social/oxlint-config](./configs/oxlint) for usage instructions and ESLint integration setup.

---

## 📁 Repository Structure

```
configs/
├── eslint/
│   ├── typescript/     # @m-social/eslint-config-typescript
│   ├── react/          # @m-social/eslint-config-react
│   ├── svelte/         # @m-social/eslint-config-svelte
│   └── next/           # @m-social/eslint-config-next
├── prettier/
│   ├── base/           # @m-social/prettier-config
│   ├── react/          # @m-social/prettier-config-react
│   ├── svelte/         # @m-social/prettier-config-svelte
│   └── utils/          # Shared utilities
├── biome/              # @m-social/biome-config
├── oxlint/             # @m-social/oxlint-config
└── cspell/             # @m-social/cspell-config
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

---

**Note:** Biome and Oxlint configurations are currently experimental. Biome supports formatting only, with linting rules planned for future releases. Oxlint can be used alongside ESLint for improved performance but requires additional integration setup.
