/**
 *
 */

import { getMonth } from "./index"; // Remplace avec le chemin réel vers votre helper

describe("Date helper", () => {
  describe("When getMonth is called", () => {
    it("the function returns 'janvier' for 2022-01-01 as date", () => {
      // Préparation
      const date = new Date("2022-01-01");

      // Appel de la fonction
      const month = getMonth(date);

      // Assertion
      expect(month).toBe("janvier");
    });

    it("the function returns 'juillet' for 2022-07-08 as date", () => {
      // Préparation
      const date = new Date("2022-07-08");

      // Appel de la fonction
      const month = getMonth(date);

      // Assertion
      expect(month).toBe("juillet");
    });
  });
});
