import { describe, expect, it, vi } from "vitest";

import { showHelp } from "../help.js";

describe("help", () => {
  describe("showHelp", () => {
    it("should display help message", () => {
      const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

      showHelp();

      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining("🔧 TypeScript Config Generator")
      );

      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining("Usage: npx @sensoq/ts-config generate")
      );

      consoleSpy.mockRestore();
    });

    it("should include all template names in help", () => {
      const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

      showHelp();

      const helpText = consoleSpy.mock.calls[0][0];

      expect(helpText).toContain("base");
      expect(helpText).toContain("nx-library");
      expect(helpText).toContain("nx-workspace");
      expect(helpText).toContain("vitest");
      expect(helpText).toContain("node");

      consoleSpy.mockRestore();
    });

    it("should include options documentation", () => {
      const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

      showHelp();

      const helpText = consoleSpy.mock.calls[0][0];

      expect(helpText).toContain("--output, -o");
      expect(helpText).toContain("--force, -f");
      expect(helpText).toContain("--interactive, -i");
      expect(helpText).toContain("--help, -h");

      consoleSpy.mockRestore();
    });

    it("should include usage examples", () => {
      const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

      showHelp();

      const helpText = consoleSpy.mock.calls[0][0];

      expect(helpText).toContain("Examples:");
      expect(helpText).toContain("npx @sensoq/ts-config generate base");
      expect(helpText).toContain("--output tsconfig.lib.json");
      expect(helpText).toContain("--force");
      expect(helpText).toContain("--interactive");

      consoleSpy.mockRestore();
    });
  });
});
