import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { main } from "../generate.js";
import { parseArgs } from "../utils.js";
import { showHelp } from "../help.js";

// Mock dependencies
vi.mock("../templates.js", () => ({
  findTemplate: vi.fn(),
  getTemplateNames: vi.fn().mockReturnValue(["base", "nx-library", "vitest"]),
}));

vi.mock("../help.js", () => ({
  showHelp: vi.fn(),
}));

vi.mock("../config-generator.js", () => ({
  generateConfig: vi.fn(),
}));

vi.mock("../utils.js", () => ({
  parseArgs: vi.fn(),
  promptForSettings: vi.fn(),
}));

// Mock console methods and process.exit without throwing
const consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {});
const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
const processExitSpy = vi.spyOn(process, "exit").mockImplementation(() => {
  // Don't actually exit, just mock the call
  return undefined as never;
});

describe("generate main function", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    consoleErrorSpy.mockRestore();
    processExitSpy.mockRestore();
  });

  describe("help scenarios", () => {
    it("should show help when no arguments provided", async () => {
      vi.mocked(parseArgs).mockReturnValue({
        command: "",
        templateName: "",
        options: { outputPath: "", force: false, interactive: false },
      });

      await main();

      expect(showHelp).toHaveBeenCalled();
    });

    it("should show help when --help flag provided", async () => {
      vi.mocked(parseArgs).mockReturnValue({
        command: "help",
        templateName: "",
        options: { outputPath: "", force: false, interactive: false },
      });

      await main();

      expect(showHelp).toHaveBeenCalled();
    });

    it("should show help when -h flag provided", async () => {
      vi.mocked(parseArgs).mockReturnValue({
        command: "help",
        templateName: "",
        options: { outputPath: "", force: false, interactive: false },
      });

      await main();

      expect(showHelp).toHaveBeenCalled();
    });
  });
});
