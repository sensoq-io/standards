import { templates } from "./templates.js";

export function showHelp(): void {
  console.log(`
🔧 TypeScript Config Generator

Usage: npx @sensoq/ts-config generate [template] [options]

Templates:
${templates.map((t) => `  ${t.name.padEnd(15)} ${t.description}`).join("\n")}

Options:
  --output, -o <path>     Output file path (default: tsconfig.json)
  --force, -f             Overwrite existing file
  --interactive, -i       Interactive mode to customize settings
  --help, -h              Show this help

Examples:
  npx @sensoq/ts-config generate base
  npx @sensoq/ts-config generate nx-library --output tsconfig.lib.json
  npx @sensoq/ts-config generate test --force
  npx @sensoq/ts-config generate nx-workspace --interactive
`);
}
