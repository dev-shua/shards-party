// src/core/settings.ts
import { MODULE_ID } from "@utils/constants";

export const SETTINGS_KEYS = {
  FIELDS: "party.fields",
} as const;

type SettingsKey = typeof SETTINGS_KEYS[keyof typeof SETTINGS_KEYS];

export function registerSettings(): void {
  game.settings.register(MODULE_ID, SETTINGS_KEYS.FIELDS, {
    name: "SP.Settings.Fields.Name",
    hint: "SP.Settings.Fields.Hint",
    scope: "client",
    config: false,
    type: Object,
    default: ["hp", "prc"],
  });
}

export function getSetting<T>(key: SettingsKey): T {
  return game.settings.get(MODULE_ID, key) as T;
}

export async function setSetting<T>(key: SettingsKey, value: T): Promise<void> {
  await game.settings.set(MODULE_ID, key, value);
}