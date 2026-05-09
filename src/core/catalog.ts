export type FieldKey = "ac" | "prc" | "inv" | "spd" | "hp" | "inspi" | "init";

export interface FieldDef {
  key: FieldKey;
  label: string;
  read: (a: any) => string | number | null;
}

export const PARTY_FIELDS: FieldDef[] = [
  {
    key: "ac",
    label: "SP.Fields.AC",
    read: (actor: any) => actor.system?.attributes?.ac?.value ?? null,
  },
  {
    key: "prc",
    label: "SP.Fields.PassivePerception",
    read: (actor: any) => actor.system?.skills?.prc?.passive ?? null,
  },
  {
    key: "inv",
    label: "SP.Fields.PassiveInvestigation",
    read: (actor: any) => actor.system?.skills?.inv?.passive ?? null,
  },
  {
    key: "spd",
    label: "SP.Fields.Speed",
    read: (actor: any) => actor.system?.attributes?.movement?.walk ?? null,
  },
  {
    key: "hp",
    label: "SP.Fields.HP",
    read: (actor: any) =>
      `${actor.system?.attributes?.hp?.value}/${actor.system?.attributes?.hp?.max}`,
  },
  {
    key: "inspi",
    label: "SP.Fields.Inspiration",
    read: (actor: any) => (actor.system?.attributes?.inspiration ? "true" : "false"),
  },
  {
    key: "init",
    label: "SP.Fields.Initiative",
    read: (actor: any) => actor.system?.attributes?.init?.total ?? null,
  },
];

export const FIELD_ICONS: Record<FieldKey, string> = {
  ac:    "fas fa-shield-alt",
  prc:   "fas fa-eye",
  inv:   "fas fa-search",
  spd:   "fa-solid fa-shoe-prints",
  init:  "fas fa-bolt",
  hp:    "",
  inspi: "",
};

export const validateKeys = (keys: string[] | undefined): FieldKey[] => {
  const valid = new Set(PARTY_FIELDS.map((f) => f.key));
  return (keys ?? []).filter((k): k is FieldKey => valid.has(k as FieldKey));
};