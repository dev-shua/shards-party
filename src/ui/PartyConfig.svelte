<script lang="ts">
  import { PARTY_FIELDS, FIELD_ICONS, validateKeys, type FieldKey } from "@core/catalog";
  import { getSetting, setSetting, SETTINGS_KEYS } from "@core/settings";
  import { refreshParty } from "@ui/partyStore";

  export let onClose: () => void = () => {};

  const allFields = PARTY_FIELDS.filter(f => f.key !== "hp" && f.key !== "inspi");

  let selected: Set<FieldKey> = new Set(
    validateKeys(getSetting<FieldKey[]>(SETTINGS_KEYS.FIELDS))
      .filter(k => k !== "hp" && k !== "inspi")
  );

  function toggle(key: FieldKey): void {
    if (selected.has(key)) selected.delete(key);
    else selected.add(key);
    selected = new Set(selected);
  }

  async function save(): Promise<void> {
    const fields: FieldKey[] = ["hp", "inspi", ...Array.from(selected)];
    await setSetting(SETTINGS_KEYS.FIELDS, fields);
    refreshParty();
    onClose();
  }
</script>

<div class="sp-config-body">
  <div class="sp-fields">
    {#each allFields as field (field.key)}
      <button
        type="button"
        class="sp-field-row"
        class:is-active={selected.has(field.key)}
        on:click={() => toggle(field.key)}
      >
        <i class={FIELD_ICONS[field.key]}></i>
        <span class="sp-field-label">{game.i18n.localize(field.label)}</span>
        <div class="sp-field-toggle">
          <div class="sp-field-toggle-thumb"></div>
        </div>
      </button>
    {/each}
  </div>

  <div class="sp-config-footer">
    <button type="button" class="sp-config-save" on:click={save}>
      <i class="fa-solid fa-check"></i>
      {game.i18n.localize("SP.Config.Save")}
    </button>
  </div>
</div>

<style>
  .sp-config-body {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .sp-fields {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 8px 12px;
    gap: 2px;
  }

  .sp-field-row {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 10px;
    border-radius: 8px;
    border: none;
    background: transparent;
    color: var(--sc-text-muted);
    cursor: pointer;
    transition: background 120ms, color 120ms;
    width: 100%;
    text-align: left;
  }

  .sp-field-row:hover {
    background: rgba(255, 255, 255, 0.05);
    color: var(--sc-text);
  }

  .sp-field-row.is-active {
    color: var(--sc-text);
  }

  .sp-field-row i {
    font-size: 13px;
    width: 16px;
    text-align: center;
    flex-shrink: 0;
  }

  .sp-field-label {
    flex: 1;
    font-size: 0.85em;
  }

  .sp-field-toggle {
    width: 28px;
    height: 16px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.1);
    position: relative;
    flex-shrink: 0;
    transition: background 150ms, border-color 150ms;
  }

  .sp-field-toggle-thumb {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transition: transform 150ms, background 150ms;
  }

  .sp-field-row.is-active .sp-field-toggle {
    background: color-mix(in srgb, var(--sc-success) 30%, transparent);
    border-color: color-mix(in srgb, var(--sc-success) 50%, transparent);
  }

  .sp-field-row.is-active .sp-field-toggle-thumb {
    transform: translateX(12px);
    background: var(--sc-success);
  }

  .sp-config-footer {
    display: flex;
    justify-content: flex-end;
    padding: 10px 12px;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }

  .sp-config-save {
    height: 30px !important;
    padding: 0 14px;
    border-radius: 8px;
    border: 1px solid color-mix(in srgb, var(--sc-success) 40%, transparent);
    background: color-mix(in srgb, var(--sc-success) 15%, transparent);
    color: inherit;
    cursor: pointer;
    font-weight: 600;
    font-size: 0.82em;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: background 120ms;
  }

  .sp-config-save:hover {
    background: color-mix(in srgb, var(--sc-success) 28%, transparent);
  }
</style>