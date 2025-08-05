import * as fs from "fs";
import * as path from "path";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { TSConfigTemplate } from "../templates.js";
import { generateConfig } from "../config-generator.js";

// Mock fs module
vi.mock("fs", () => ({
  writeFileSync: vi.fn(),
  existsSync: vi.fn(),
  mkdirSync: vi.fn(),
}));

vi.mock("path", () => ({
  dirname: vi.fn(),
}));

// Mock console.log
const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

describe("config-generator", () => {
  const mockTemplate: TSConfigTemplate = {
    name: "test-template",
    description: "Vitest template",
    filename: "vitest.json",
    defaultSettings: {
      outDir: "dist",
      rootDir: "src",
      include: ["src/**/*.ts"],
      exclude: ["src/**/*.test.ts"],
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(fs.existsSync).mockReturnValue(false);
    vi.mocked(path.dirname).mockReturnValue("/some/dir");
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  describe("generateConfig", () => {
    it("should generate config with template extends", () => {
      generateConfig(mockTemplate, "tsconfig.json");

      expect(fs.writeFileSync).toHaveBeenCalledWith(
        "tsconfig.json",
        expect.stringContaining('"extends": "@sensoq/ts-config/vitest.json"')
      );
    });

    it("should include default settings in config", () => {
      generateConfig(mockTemplate, "tsconfig.json");

      const writtenContent = vi.mocked(fs.writeFileSync).mock
        .calls[0][1] as string;
      const config = JSON.parse(writtenContent.trim());

      expect(config.compilerOptions.outDir).toBe("dist");
      expect(config.compilerOptions.rootDir).toBe("src");
      expect(config.include).toEqual(["src/**/*.ts"]);
      expect(config.exclude).toEqual(["src/**/*.test.ts"]);
    });

    it("should override settings when provided", () => {
      const customSettings = {
        outDir: "build",
        include: ["lib/**/*.ts"],
      };

      generateConfig(mockTemplate, "tsconfig.json", customSettings);

      const writtenContent = vi.mocked(fs.writeFileSync).mock
        .calls[0][1] as string;
      const config = JSON.parse(writtenContent.trim());

      expect(config.compilerOptions.outDir).toBe("build");
      expect(config.include).toEqual(["lib/**/*.ts"]);
    });

    it("should throw error when file exists and force is false", () => {
      vi.mocked(fs.existsSync).mockReturnValue(true);

      expect(() => {
        generateConfig(mockTemplate, "tsconfig.json");
      }).toThrow(
        "File already exists: tsconfig.json. Use --force to overwrite."
      );
    });

    it("should overwrite when file exists and force is true", () => {
      vi.mocked(fs.existsSync).mockReturnValue(true);

      expect(() => {
        generateConfig(mockTemplate, "tsconfig.json", undefined, true);
      }).not.toThrow();

      expect(fs.writeFileSync).toHaveBeenCalled();
    });

    it("should create directory if it doesn't exist", () => {
      vi.mocked(fs.existsSync)
        .mockReturnValueOnce(false)
        .mockReturnValueOnce(false);

      generateConfig(mockTemplate, "config/tsconfig.json");

      expect(path.dirname).toHaveBeenCalledWith("config/tsconfig.json");
      expect(fs.mkdirSync).toHaveBeenCalledWith("/some/dir", {
        recursive: true,
      });
    });

    it("should not create directory if it exists", () => {
      vi.mocked(fs.existsSync)
        .mockReturnValueOnce(false)
        .mockReturnValueOnce(true);

      generateConfig(mockTemplate, "config/tsconfig.json");

      expect(fs.mkdirSync).not.toHaveBeenCalled();
    });

    it("should handle template without default settings", () => {
      const simpleTemplate: TSConfigTemplate = {
        name: "simple",
        description: "Simple template",
        filename: "simple.json",
      };

      generateConfig(simpleTemplate, "tsconfig.json");

      const writtenContent = vi.mocked(fs.writeFileSync).mock
        .calls[0][1] as string;
      const config = JSON.parse(writtenContent.trim());

      expect(config.extends).toBe("@sensoq/ts-config/simple.json");
      expect(config.compilerOptions).toBeUndefined();
      expect(config.include).toBeUndefined();
      expect(config.exclude).toBeUndefined();
    });

    it("should handle paths in compiler options", () => {
      const templateWithPaths: TSConfigTemplate = {
        name: "with-paths",
        description: "Template with paths",
        filename: "paths.json",
        defaultSettings: {
          baseUrl: ".",
          paths: {
            "@/*": ["src/*"],
            "@utils/*": ["src/utils/*"],
          },
        },
      };

      generateConfig(templateWithPaths, "tsconfig.json");

      const writtenContent = vi.mocked(fs.writeFileSync).mock
        .calls[0][1] as string;
      const config = JSON.parse(writtenContent.trim());

      expect(config.compilerOptions.baseUrl).toBe(".");
      expect(config.compilerOptions.paths).toEqual({
        "@/*": ["src/*"],
        "@utils/*": ["src/utils/*"],
      });
    });

    it("should format JSON with proper indentation", () => {
      generateConfig(mockTemplate, "tsconfig.json");

      const writtenContent = vi.mocked(fs.writeFileSync).mock
        .calls[0][1] as string;

      // Should be properly formatted JSON with 2-space indentation
      expect(writtenContent).toMatch(/{\n  "extends":/);
      expect(writtenContent.endsWith("\n")).toBe(true);
    });
  });
});
