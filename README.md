# 🎯 Sensoq Standards

> **A collection of reusable TypeScript configurations and development standards for modern JavaScript/TypeScript projects**

[![Built with Nx](https://img.shields.io/badge/built%20with-Nx-blueviolet)](https://nx.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 📦 Packages

### 🔧 [@sensoq/ts-config](./packages/ts-config)

**TypeScript Configuration Templates for Every Project Type**

A powerful CLI tool and library providing battle-tested TypeScript configurations for different project scenarios. Say goodbye to repetitive tsconfig.json setup!

#### ✨ Features

- 🎯 **Multiple Templates**: Pre-configured for different use cases
- 🚀 **CLI Tool**: Generate configs with a single command
- 🔄 **Extensible**: Easy to customize and extend
- 📱 **Modern**: Supports latest TypeScript features
- 🧪 **Well-Tested**: Comprehensive test coverage

#### 🛠️ Available Templates

| Template       | Description                                              | Use Case                 |
| -------------- | -------------------------------------------------------- | ------------------------ |
| `base`         | Foundation TypeScript configuration with strict settings | General purpose projects |
| `nx-library`   | Nx library with Rollup bundling support                  | Nx monorepo libraries    |
| `nx-workspace` | Nx workspace/monorepo configuration                      | Nx workspace root        |
| `vitest`       | Testing configuration for Vitest                         | Test files configuration |
| `node`         | Node.js applications and libraries                       | Backend/CLI applications |

#### 🚀 Quick Start

```bash
# Install the package
npm install @sensoq/ts-config

# Generate a TypeScript config
npx @sensoq/ts-config generate base

# Generate with custom output
npx @sensoq/ts-config generate nx-library --output tsconfig.lib.json

# Force overwrite existing file
npx @sensoq/ts-config generate vitest --force

# Interactive mode for customization
npx @sensoq/ts-config generate base --interactive
```

#### 📄 Example Generated Config

```json
{
  "extends": "@sensoq/ts-config/base.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src/**/*.ts"],
  "exclude": ["src/**/*.test.ts", "src/**/*.spec.ts"]
}
```

#### 🔗 Quick Links

- 📖 [Full Documentation](./packages/ts-config/README.md)
- 🎯 [CLI Usage Guide](./packages/ts-config/README.md#cli-usage)
- 🧪 [Template Examples](./packages/ts-config/src/)
- 🐛 [Report Issues](https://github.com/sensoq-io/typescript/issues)

---

## 🛠️ Tools & Extensions

- **[Nx Console](https://nx.dev/getting-started/editor-setup)** - VSCode/IntelliJ extension for enhanced DX
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript development
- **[Vitest](https://vitest.dev/)** - Lightning fast testing framework
- **[Rollup](https://rollupjs.org/)** - Modern bundler for libraries

### TypeScript Resources

- 📖 [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- 🔧 [TSConfig Reference](https://www.typescriptlang.org/tsconfig)
- 🎯 [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/best-practices.html)

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

<div align="center">
  <p>Made with ❤️ by the Sensoq team</p>
  <p>
    <a href="https://github.com/sensoq-io">GitHub</a> •
    <a href="https://github.com/sensoq-io/typescript/issues">Issues</a> •
    <a href="https://github.com/sensoq-io/typescript/discussions">Discussions</a>
  </p>
</div>
