"use client";

import { useSyncExternalStore } from "react";

/**
 * Returns `false` during SSR and initial hydration, `true` after the
 * component has mounted on the client. Use this to guard components
 * that generate non-deterministic output (e.g. Radix Select IDs) and
 * would otherwise cause React hydration mismatches.
 *
 * Uses `useSyncExternalStore` so there is no `setState`-in-effect.
 */
const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export function useMounted(): boolean {
  return useSyncExternalStore(emptySubscribe, getClientSnapshot, getServerSnapshot);
}
