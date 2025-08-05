export interface TSConfigTemplate {
  name: string;
  description: string;
  filename: string;
  defaultSettings?: {
    outDir?: string;
    rootDir?: string;
    include?: string[];
    exclude?: string[];
    baseUrl?: string;
    paths?: Record<string, string[]>;
  };
}

export const templates: TSConfigTemplate[] = [
  {
    name: "base",
    description: "Foundation TypeScript configuration with strict settings",
    filename: "base.json",
  },
  {
    name: "nx-library",
    description: "Nx library with Rollup bundling support",
    filename: "nx-rollup-library.json",
    defaultSettings: {
      outDir: "dist",
      rootDir: "src",
      include: ["src/**/*.ts"],
      exclude: ["src/**/*.test.ts", "src/**/*.spec.ts"],
    },
  },
  {
    name: "nx-workspace",
    description: "Nx workspace/monorepo configuration",
    filename: "nx-workspace.json",
    defaultSettings: {
      baseUrl: ".",
      include: ["packages/*/src/**/*.ts"],
      exclude: ["**/node_modules", "**/dist", "**/*.test.ts", "**/*.spec.ts"],
    },
  },
  {
    name: "vitest",
    description: "Testing configuration for Vitest",
    filename: "vitest.json",
    defaultSettings: {
      include: ["src/**/*.test.ts", "src/**/*.spec.ts"],
      exclude: ["node_modules", "dist"],
    },
  },
  {
    name: "node",
    description: "Node.js applications and libraries",
    filename: "node.json",
    defaultSettings: {
      outDir: "dist",
      rootDir: "src",
      include: ["src/**/*.ts"],
      exclude: ["src/**/*.test.ts", "src/**/*.spec.ts"],
    },
  },
];

export function findTemplate(name: string): TSConfigTemplate | undefined {
  return templates.find((t) => t.name === name);
}

export function getTemplateNames(): string[] {
  return templates.map((t) => t.name);
}
