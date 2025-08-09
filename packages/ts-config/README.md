# @sensoq/ts-config

A TypeScript library providing reusable TypeScript configuration templates for different use cases in monorepos and library development.

## 📦 Installation & Usage

### � CLI Tool (Recommended)

The easiest way to use these configurations is via the CLI:

```bash
# Generate a base TypeScript config
npx @sensoq/ts-config generate base

# Generate an Nx library config with custom output
npx @sensoq/ts-config generate nx-library --output tsconfig.lib.json

# Generate a test config with force overwrite
npx @sensoq/ts-config generate test --force

# See all available templates and options
npx @sensoq/ts-config generate --help
```

### � Manual Installation

Install the package as a dev dependency:

```bash
npm install -D @sensoq/ts-config
```

Then extend the configs in your project:

```json
{
  "extends": "@sensoq/ts-config/base.json"
}
```

Or copy the files directly from `node_modules/@sensoq/ts-config/src/` to your project.

## 🎯 Design Philosophy

These configurations are **generic and reusable**. They contain only the compiler options and settings, without project-specific paths. Users should extend these configs and provide their own `include`, `exclude`, `outDir`, and other path-specific settings.

## Available Configurations

### 🏗️ `base.json`

**Purpose**: Foundation configuration with sensible defaults
**Usage**: Extended by all other configs
**Features**:

- ES2022 target and lib
- Strict type checking
- Modern module resolution
- Source maps and declarations
- **Generic**: No paths specified

### 📦 `nx-rollup-library.json`

**Purpose**: Unified configuration for Nx library packages with Rollup bundling
**Usage**: `"extends": "@sensoq/ts-config/nx-rollup-library.json"`
**Features**:

- Composite builds for Nx project references
- Compatible with Rollup bundler
- Full emit with declarations
- Bundler module resolution
- Development conditions
- **Generic**: Add your own `include`, `exclude`, `outDir`, `rootDir`

### 🏢 `nx-workspace.json`

**Purpose**: Monorepo workspace with project references
**Usage**: `"extends": "@sensoq/ts-config/nx-workspace.json"`
**Features**:

- Project references support
- Workspace-aware module resolution
- **Generic**: Add your own `baseUrl`, `paths`, `include`, `exclude`

### 🧪 `vitest.json`

**Purpose**: Testing with Vitest
**Usage**: `"extends": "@sensoq/ts-config/vitest.json"`
**Features**:

- Test globals and types
- JSON module resolution
- No emit (tests don't need output)
- **Generic**: Add your own `include`, `exclude` for test files

### 🚀 `node.json`

**Purpose**: Node.js applications and libraries
**Usage**: `"extends": "@sensoq/ts-config/node.json"`
**Features**:

- Node.js module resolution
- Node types included
- CommonJS/ESM dual support
- **Generic**: Add your own `include`, `exclude`, `outDir`, `rootDir`

## Usage Examples

### Basic Library Setup:

```json
{
  "extends": "@sensoq/ts-config/nx-rollup-library.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src/**/*.ts"],
  "exclude": ["src/**/*.test.ts", "src/**/*.spec.ts"]
}
```

### Rollup Configuration:

```javascript
typescript({
  tsconfig: "./tsconfig.lib.json", // your extending config
  // Rollup will use the extending config's paths
});
```

### Testing Setup:

```json
{
  "extends": "@sensoq/ts-config/vitest.json",
  "include": ["src/**/*.test.ts", "src/**/*.spec.ts"],
  "exclude": ["node_modules", "dist"]
}
```

### Monorepo Workspace:

```json
{
  "extends": "@sensoq/ts-config/nx-workspace.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@myorg/*": ["packages/*/src/index.ts"]
    }
  },
  "include": ["packages/*/src/**/*.ts"],
  "exclude": ["**/node_modules", "**/dist"]
}
```

## Configuration Matrix

| Config            | Composite | Module   | Target | Use Case         |
| ----------------- | --------- | -------- | ------ | ---------------- |
| base              | No        | esnext   | es2022 | Foundation       |
| nx-rollup-library | Yes       | esnext   | es2022 | Nx libs + Rollup |
| nx-workspace      | Yes       | nodenext | es2022 | Monorepo         |
| test              | No        | esnext   | es2022 | Testing          |
| node              | No        | nodenext | es2022 | Node.js          |

## Tips

1. **Always extend these base configs** - They contain the core settings
2. **Add your own paths** - These configs are generic, you provide the project-specific paths
3. **Override as needed** - All settings can be overridden in your extending config
4. **Copy to your project** - These configs are designed to be copied and reused
5. **Start simple** - Begin with the base config and add specifics as needed

## Why Generic?

- ✅ **Portable**: Copy to any project structure
- ✅ **Flexible**: Works with different folder layouts
- ✅ **Maintainable**: Core settings in one place, paths in another
- ✅ **Reusable**: Same configs work for multiple projects
- ✅ **Future-proof**: No hardcoded assumptions about project structure

## 🏗️ Development

### Building

Run `nx build ts-config` to build the library.

### Running unit tests

Run `nx test ts-config` to execute the unit tests via [Vitest](https://vitest.dev/).

### Using the Library Code

```typescript
import { tsConfig } from "@sensoq/ts-config";

console.log(tsConfig()); // "ts-config"
```
