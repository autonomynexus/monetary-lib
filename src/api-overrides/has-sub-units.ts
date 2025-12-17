import type { HasSubUnitsParams } from "../api";
import { hasSubUnits as coreHasSubUnits } from "../api";
import { getCalculator } from "../helpers";

/**
 * Check whether a Monetary object has minor currency units.
 *
 * @param monetaryObject - The Monetary object to check.
 *
 * @returns Whether the Monetary object has minor currency units.
 *
 * @public
 */
export function hasSubUnits<TAmount>(
  ...[monetaryObject]: HasSubUnitsParams<TAmount>
) {
  const calculator = getCalculator(monetaryObject.amount);
  const hasSubUnitsFn = coreHasSubUnits(calculator);

  return hasSubUnitsFn(monetaryObject);
}
