import { haveSameCurrency as coreHaveSameCurrency } from "../api";

/**
 * Check whether a set of Monetary objects have the same currency.
 *
 * @param monetaryObjects - The Monetary objects to compare.
 *
 * @returns Whether the Monetary objects have the same currency.
 *
 * @public
 */
export const haveSameCurrency = coreHaveSameCurrency;
