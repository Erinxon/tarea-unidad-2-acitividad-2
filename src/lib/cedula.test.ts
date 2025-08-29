import { describe, it, expect } from "vitest";
import { validateCedula, formatPretty } from "./cedula";

const validSamples = [
  "40241394648",
  "00100000058",
  "00100000371",
].map(s => [s, s.replace(/^(\d{3})(\d{7})(\d)$/, "$1-$2-$3")] as const);

describe("validateCedula", () => {
  it("acepta válidas con o sin guiones", () => {
    for (const [plain, pretty] of validSamples) {
      expect(validateCedula(plain)).toBe(true);
      expect(validateCedula(pretty)).toBe(true);
    }
  });

  it("rechaza longitudes distintas a 11", () => {
    expect(validateCedula("123")).toBe(false);
    expect(validateCedula("123456789012")).toBe(false);
  });

  it("rechaza caracteres no numéricos (luego de limpiar guiones)", () => {
    expect(validateCedula("001-ABC4567-8")).toBe(false);
  });
});

describe("formatPretty", () => {
  it("formatea a ###-#######-#", () => {
    expect(formatPretty("00113918253")).toBe("001-1391825-3");
  });
});