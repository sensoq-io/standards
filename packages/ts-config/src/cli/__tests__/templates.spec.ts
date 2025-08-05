import { describe, expect, it } from "vitest";
import { findTemplate, getTemplateNames, templates } from "../templates.js";

describe("templates", () => {
  describe("templates array", () => {
    it("should contain all expected templates", () => {
      const templateNames = templates.map((t) => t.name);
      expect(templateNames).toContain("base");
      expect(templateNames).toContain("nx-library");
      expect(templateNames).toContain("nx-workspace");
      expect(templateNames).toContain("vitest");
      expect(templateNames).toContain("node");
    });

    it("should have valid template structure", () => {
      templates.forEach((template) => {
        expect(template).toHaveProperty("name");
        expect(template).toHaveProperty("description");
        expect(template).toHaveProperty("filename");
        expect(typeof template.name).toBe("string");
        expect(typeof template.description).toBe("string");
        expect(typeof template.filename).toBe("string");
      });
    });

    it("should have unique template names", () => {
      const names = templates.map((t) => t.name);
      const uniqueNames = [...new Set(names)];
      expect(names).toHaveLength(uniqueNames.length);
    });
  });

  describe("findTemplate", () => {
    it("should find existing template", () => {
      const template = findTemplate("base");
      expect(template).toBeDefined();
      expect(template?.name).toBe("base");
      expect(template?.filename).toBe("base.json");
    });

    it("should return undefined for non-existing template", () => {
      const template = findTemplate("non-existing");
      expect(template).toBeUndefined();
    });

    it("should be case-sensitive", () => {
      const template = findTemplate("BASE");
      expect(template).toBeUndefined();
    });
  });

  describe("getTemplateNames", () => {
    it("should return all template names", () => {
      const names = getTemplateNames();
      expect(names).toHaveLength(templates.length);
      expect(names).toContain("base");
      expect(names).toContain("nx-library");
    });

    it("should return strings only", () => {
      const names = getTemplateNames();
      names.forEach((name) => {
        expect(typeof name).toBe("string");
      });
    });
  });

  describe("template default settings", () => {
    it("nx-library should have correct default settings", () => {
      const template = findTemplate("nx-library");
      expect(template?.defaultSettings).toEqual({
        outDir: "dist",
        rootDir: "src",
        include: ["src/**/*.ts"],
        exclude: ["src/**/*.test.ts", "src/**/*.spec.ts"],
      });
    });

    it("nx-workspace should have correct default settings", () => {
      const template = findTemplate("nx-workspace");
      expect(template?.defaultSettings).toEqual({
        baseUrl: ".",
        include: ["packages/*/src/**/*.ts"],
        exclude: ["**/node_modules", "**/dist", "**/*.test.ts", "**/*.spec.ts"],
      });
    });

    it("base template should not have default settings", () => {
      const template = findTemplate("base");
      expect(template?.defaultSettings).toBeUndefined();
    });
  });
});
