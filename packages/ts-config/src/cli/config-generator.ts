import { existsSync, mkdirSync, writeFileSync } from "fs";

import type { TSConfigTemplate } from "./templates.js";
import { dirname } from "path";

export function generateConfig(
  template: TSConfigTemplate,
  outputPath: string,
  settings?: any,
  force = false
): void {
  if (existsSync(outputPath) && !force) {
    throw new Error(
      `File already exists: ${outputPath}. Use --force to overwrite.`
    );
  }

  // Create the final config that extends the template
  const config: any = {
    extends: `@sensoq/ts-config/${template.filename}`,
  };

  // Add project-specific settings
  const projectSettings = settings || template.defaultSettings;
  if (projectSettings) {
    if (
      projectSettings.outDir ||
      projectSettings.rootDir ||
      projectSettings.baseUrl ||
      projectSettings.paths
    ) {
      config.compilerOptions = {};

      if (projectSettings.outDir) {
        config.compilerOptions.outDir = projectSettings.outDir;
      }
      if (projectSettings.rootDir) {
        config.compilerOptions.rootDir = projectSettings.rootDir;
      }
      if (projectSettings.baseUrl) {
        config.compilerOptions.baseUrl = projectSettings.baseUrl;
      }
      if (projectSettings.paths) {
        config.compilerOptions.paths = projectSettings.paths;
      }
    }

    if (projectSettings.include) {
      config.include = projectSettings.include;
    }
    if (projectSettings.exclude) {
      config.exclude = projectSettings.exclude;
    }
  }

  // Ensure directory exists
  const outputDir = dirname(outputPath);
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  // Write the config
  writeFileSync(outputPath, JSON.stringify(config, null, 2) + "\n");

  console.log(`✅ Generated ${template.name} configuration: ${outputPath}`);
}
