import { findTemplate, getTemplateNames } from "./templates.js";
import { parseArgs, promptForSettings } from "./utils.js";

import { generateConfig } from "./config-generator.js";
import { showHelp } from "./help.js";

export async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
    showHelp();
    return;
  }

  const { command, templateName, options } = parseArgs(args);

  if (command !== "generate") {
    console.error('❌ Unknown command. Use "generate" or --help for usage.');
    process.exit(1);
  }

  if (!templateName) {
    console.error(
      "❌ Template name required. Use --help for available templates."
    );
    process.exit(1);
  }

  const template = findTemplate(templateName);
  if (!template) {
    console.error(`❌ Unknown template: ${templateName}`);
    console.error(`Available templates: ${getTemplateNames().join(", ")}`);
    process.exit(1);
  }

  try {
    let settings = template.defaultSettings;

    if (options.interactive) {
      settings = await promptForSettings(template);
    }

    generateConfig(template, options.outputPath, settings, options.force);

    console.log(`\n📖 Next steps:`);
    console.log(`   1. Review the generated ${options.outputPath}`);
    console.log(`   2. Customize paths and settings as needed`);
    console.log(`   3. Install the package: npm install @sensoq/ts-config`);
  } catch (error) {
    console.error(`❌ Error: ${(error as Error).message}`);
    process.exit(1);
  }
}

// Run when called directly
main().catch(console.error);
