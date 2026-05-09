import { writable } from "svelte/store";
import { PARTY_FIELDS, validateKeys, type FieldKey } from "@core/catalog";
import { getSetting, SETTINGS_KEYS } from "@core/settings";

export type PartyCard = {
  id: string;
  name: string;
  img: string;
  hp?: { actual: string; total: string; percent: number; cls: string };
  inspi?: boolean;
  stats: Array<{ key: string; label: string; value: string | number | null }>;
};

function getHPColor(pct: number): string {
  if (pct <= 25) return "critical";
  if (pct <= 50) return "wounded";
  if (pct <= 75) return "scratch";
  return "healthy";
}

function buildCard(actor: any): PartyCard {
  const selectedKeys = validateKeys(getSetting<FieldKey[]>(SETTINGS_KEYS.FIELDS));
  const selectedFields = PARTY_FIELDS.filter(f => selectedKeys.includes(f.key));

  const card: PartyCard = {
    id: actor.id ?? "",
    name: actor.name ?? "—",
    img: actor.img ?? actor?.prototypeToken?.texture?.src ?? "",
    stats: [],
  };

  for (const field of selectedFields) {
    const val = field.read(actor);
    if (field.key === "hp") {
      const parts = String(val).split("/");
      const cur = Number(parts[0] ?? 0);
      const max = Number(parts[1] ?? 0);
      const pct = max > 0 ? Math.round((cur / max) * 100) : 0;
      card.hp = { actual: parts[0], total: parts[1], percent: pct, cls: getHPColor(pct) };
    } else if (field.key === "inspi") {
      card.inspi = val === "true";
    } else {
      card.stats.push({
        key: field.key,
        label: game.i18n.localize(field.label) ?? field.label,
        value: val,
      });
    }
  }

  return card;
}

function buildParty(): PartyCard[] {
  return ((game as any).actors?.contents ?? [])
    .filter((a: any) => a?.type === "character" && a?.hasPlayerOwner)
    .map((a: any) => buildCard(a));
}

export const partyStore = writable<PartyCard[]>([]);

export function refreshParty(): void {
  partyStore.set(buildParty());
}

export function initPartyStore(): void {
  refreshParty();

  Hooks.on("updateActor", (actor: any) => {
    if (actor?.type === "character" && actor?.hasPlayerOwner) {
      refreshParty();
    }
  });

  Hooks.on("createActor", (actor: any) => {
    if (actor?.type === "character" && actor?.hasPlayerOwner) {
      refreshParty();
    }
  });

  Hooks.on("deleteActor", (actor: any) => {
    if (actor?.type === "character" && actor?.hasPlayerOwner) {
      refreshParty();
    }
  });
}