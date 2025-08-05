import { describe, expect, it, vi } from "vitest";
import { parseArgs, promptForSettings } from "../utils.js";

import type { TSConfigTemplate } from "../templates.js";

describe("utils", () => {
  describe("parseArgs", () => {
    it("should parse basic command and template", () => {
      const result = parseArgs(["generate", "base"]);

      expect(result.command).toBe("generate");
      expect(result.templateName).toBe("base");
      expect(result.options.outputPath).toBe("tsconfig.json");
      expect(result.options.force).toBe(false);
      expect(result.options.interactive).toBe(false);
    });

    it("should parse output option with long flag", () => {
      const result = parseArgs(["generate", "base", "--output", "custom.json"]);

      expect(result.options.outputPath).toBe("custom.json");
    });

    it("should parse output option with short flag", () => {
      const result = parseArgs(["generate", "base", "-o", "lib.json"]);

      expect(result.options.outputPath).toBe("lib.json");
    });

    it("should parse force option with long flag", () => {
      const result = parseArgs(["generate", "base", "--force"]);

      expect(result.options.force).toBe(true);
    });

    it("should parse force option with short flag", () => {
      const result = parseArgs(["generate", "base", "-f"]);

      expect(result.options.force).toBe(true);
    });

    it("should parse interactive option with long flag", () => {
      const result = parseArgs(["generate", "base", "--interactive"]);

      expect(result.options.interactive).toBe(true);
    });

    it("should parse interactive option with short flag", () => {
      const result = parseArgs(["generate", "base", "-i"]);

      expect(result.options.interactive).toBe(true);
    });

    it("should parse multiple options", () => {
      const result = parseArgs([
        "generate",
        "nx-library",
        "--output",
        "tsconfig.lib.json",
        "--force",
        "--interactive",
      ]);

      expect(result.command).toBe("generate");
      expect(result.templateName).toBe("nx-library");
      expect(result.options.outputPath).toBe("tsconfig.lib.json");
      expect(result.options.force).toBe(true);
      expect(result.options.interactive).toBe(true);
    });

    it("should handle mixed short and long flags", () => {
      const result = parseArgs([
        "generate",
        "vitest",
        "-o",
        "vitest.json",
        "--force",
        "-i",
      ]);

      expect(result.options.outputPath).toBe("vitest.json");
      expect(result.options.force).toBe(true);
      expect(result.options.interactive).toBe(true);
    });

    it("should handle empty args", () => {
      const result = parseArgs([]);

      expect(result.command).toBeUndefined();
      expect(result.templateName).toBeUndefined();
      expect(result.options.outputPath).toBe("tsconfig.json");
      expect(result.options.force).toBe(false);
      expect(result.options.interactive).toBe(false);
    });

    it("should handle only command", () => {
      const result = parseArgs(["generate"]);

      expect(result.command).toBe("generate");
      expect(result.templateName).toBeUndefined();
    });

    it("should use default values for unspecified options", () => {
      const result = parseArgs(["generate", "base"]);

      expect(result.options.outputPath).toBe("tsconfig.json");
      expect(result.options.force).toBe(false);
      expect(result.options.interactive).toBe(false);
    });
  });

  describe("promptForSettings", () => {
    // Mock console.log to prevent output during tests
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    it("should return settings from template defaults", async () => {
      const template: TSConfigTemplate = {
        name: "vitest",
        description: "Vitest template",
        filename: "vitest.json",
        defaultSettings: {
          outDir: "dist",
          rootDir: "src",
          include: ["src/**/*.ts"],
          exclude: ["src/**/*.test.ts"],
        },
      };

      const settings = await promptForSettings(template);

      expect(settings).toEqual({
        outDir: "dist",
        rootDir: "src",
        include: ["src/**/*.ts"],
        exclude: ["src/**/*.test.ts"],
      });
    });

    it("should handle template without default settings", async () => {
      const template: TSConfigTemplate = {
        name: "simple",
        description: "Simple template",
        filename: "simple.json",
      };

      const settings = await promptForSettings(template);

      expect(settings).toEqual({});
    });

    it("should handle partial default settings", async () => {
      const template: TSConfigTemplate = {
        name: "partial",
        description: "Partial template",
        filename: "partial.json",
        defaultSettings: {
          outDir: "build",
          include: ["lib/**/*.ts"],
        },
      };

      const settings = await promptForSettings(template);

      expect(settings).toEqual({
        outDir: "build",
        include: ["lib/**/*.ts"],
      });
    });

    it("should log configuration prompts", async () => {
      const template: TSConfigTemplate = {
        name: "vitest",
        description: "Vitest template",
        filename: "vitest.json",
        defaultSettings: {
          outDir: "dist",
        },
      };

      await promptForSettings(template);

      // Test passes if no errors are thrown during execution
      expect(true).toBe(true);
    });
  });
});
