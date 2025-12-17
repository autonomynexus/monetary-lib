import { toSnapshot as coreToSnapshot } from "../api";

/**
 * Get a snapshot of a Monetary object.
 *
 * @param monetaryObject - The Monetary object to format.
 * @param transformer - A transformer function.
 *
 * @returns A snapshot of the object.
 *
 * @public
 */
export const toSnapshot = coreToSnapshot;
