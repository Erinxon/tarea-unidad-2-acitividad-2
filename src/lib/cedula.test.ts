import { describe, it, expect } from "vitest";
import { validateCedula, formatPretty } from "./cedula";

// Sustituye por muestras reales válidas si las tienes:
const validSamples = [
  "00113918253",
  "40200700675",
  "03103749622",
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