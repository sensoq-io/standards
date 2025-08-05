import type { TSConfigTemplate } from "./templates.js";

export interface CliOptions {
  outputPath: string;
  force: boolean;
  interactive: boolean;
}

export function parseArgs(args: string[]): {
  command?: string;
  templateName?: string;
  options: CliOptions;
} {
  const options: CliOptions = {
    outputPath: "tsconfig.json",
    force: false,
    interactive: false,
  };

  const command = args[0];
  const templateName = args[1];

  for (let i = 2; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--output" || arg === "-o") {
      options.outputPath = args[++i];
    } else if (arg === "--force" || arg === "-f") {
      options.force = true;
    } else if (arg === "--interactive" || arg === "-i") {
      options.interactive = true;
    }
  }

  return { command, templateName, options };
}

export async function promptForSettings(
  template: TSConfigTemplate
): Promise<any> {
  // Simple prompting - in a real implementation you'd use a library like inquirer
  console.log(`\n📋 Configuring ${template.name} template:`);
  console.log("Press Enter to use defaults, or type custom values:\n");

  const settings: any = {};

  if (template.defaultSettings?.outDir) {
    settings.outDir = template.defaultSettings.outDir;
  }
  if (template.defaultSettings?.rootDir) {
    settings.rootDir = template.defaultSettings.rootDir;
  }
  if (template.defaultSettings?.include) {
    settings.include = template.defaultSettings.include;
  }
  if (template.defaultSettings?.exclude) {
    settings.exclude = template.defaultSettings.exclude;
  }

  return settings;
}
