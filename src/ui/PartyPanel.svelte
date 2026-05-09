<script lang="ts">
  import { partyStore } from "@ui/partyStore";
  import { mount, unmount } from "svelte";
  import PartyConfig from "@ui/PartyConfig.svelte";
  import { FIELD_ICONS, type FieldKey } from "@core/catalog";

  function openSheet(actorId: string): void {
    (game as any).actors?.get(actorId)?.sheet?.render(true);
  }

  function openConfig(): void {
    (game as any).shardsCore?.openWindow({
      id: "sp-config",
      title: game.i18n.localize("SP.Config.Title"),
      icon: "fa-solid fa-gear",
      initialW: 240,
      initialH: 300,
      render: (container: HTMLElement) => {
        const instance = mount(PartyConfig, {
          target: container,
          props: {
            onClose: () => (game as any).shardsCore?.closeWindow("sp-config"),
          },
        });
        return () => unmount(instance);
      },
    });
  }
</script>

<div class="sp-panel">
  <div class="sp-header">
    <span class="sp-title">
      {game.i18n.localize("SP.Panel.Title") ?? "Party"}
    </span>
    <button type="button" class="sp-config-btn" on:click={openConfig} aria-label="Config">
      <i class="fa-solid fa-gear"></i>
    </button>
  </div>

  <div class="sp-grid">
    {#each $partyStore as card (card.id)}
      <button
        type="button"
        class="sp-card"
        on:click={() => openSheet(card.id)}
        title={card.name}
      >
        <div class="sp-name">{card.name}</div>

        <div class="sp-avatar" class:is-inspired={card.inspi}>
          <img src={card.img} alt={card.name} />
        </div>

        {#if card.hp}
          <div class="sp-hpbar {card.hp.cls}" data-label="{card.hp.actual} / {card.hp.total}">
            <div class="sp-hp" style="width: {card.hp.percent}%"></div>
          </div>
        {/if}

        <div class="sp-stats-grid">
          {#each card.stats as stat (stat.key)}
            <i class="sp-stat-icon {FIELD_ICONS[stat.key as FieldKey]}"></i>
            <span class="sp-stat-value">{stat.value ?? "—"}</span>
          {/each}
        </div>
      </button>
    {/each}

    {#if $partyStore.length === 0}
      <div class="sp-empty">{game.i18n.localize("SP.Panel.Empty") ?? "No player characters found."}</div>
    {/if}
  </div>
</div>

<style>
  .sp-panel {
    width: 100%;
    min-width: 0;
    display: grid;
    gap: 8px;
    padding: 10px;
  }

  .sp-panel button {
    height: auto !important;
  }

  .sp-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .sp-title {
    font-weight: 700;
    font-size: 0.95em;
  }

  .sp-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
    gap: 8px;
  }

  .sp-card {
    display: flex;
    flex-direction: column;
    gap: 4px;
    border: 0;
    background: rgba(0,0,0,0.2);
    color: inherit;
    border-radius: 8px;
    padding: 8px;
    cursor: pointer;
    text-align: left;
    transition: background 120ms;
  }

  .sp-card:hover {
    background: rgba(0,0,0,0.35);
  }

  .sp-avatar {
    position: relative;
    border-radius: 6px;
    overflow: hidden;
    border: 1px solid transparent;
  }

  .sp-avatar.is-inspired {
    border-color: goldenrod;
  }

  .sp-avatar.is-inspired::after {
    content: "★";
    position: absolute;
    bottom: 4px;
    right: 6px;
    font-size: 14px;
    color: goldenrod;
    text-shadow: 0 0 2px #000;
    pointer-events: none;
  }

  .sp-avatar img {
    width: 100%;
    aspect-ratio: 2/3;
    object-fit: cover;
    border-radius: 6px;
    display: block;
  }

  .sp-name {
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
  }

  .sp-hpbar {
    position: relative;
    width: 100%;
    height: 8px;
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 4px;
    overflow: hidden;
    background: rgba(0,0,0,0.25);
  }

  .sp-hpbar::after {
    content: attr(data-label);
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font: 600 9px/1 system-ui;
    color: #fff;
    text-shadow: 0 1px 2px rgba(0,0,0,0.5);
    pointer-events: none;
  }

  .sp-hp {
    height: 100%;
    transition: width 0.2s ease;
  }

  .sp-hpbar.healthy .sp-hp { background: linear-gradient(#2ecc71, #1e8f57); }
  .sp-hpbar.scratch .sp-hp { background: linear-gradient(#a3e635, #6aa51a); }
  .sp-hpbar.wounded .sp-hp { background: linear-gradient(#f59e0b, #b45309); }
  .sp-hpbar.critical .sp-hp { background: linear-gradient(#ef4444, #b91c1c); }

  .sp-stat {
    display: flex;
    justify-content: space-between;
    font-size: 11px;
    gap: 4px;
  }

  .sp-stat-label {
    opacity: 0.7;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .sp-stat-value {
    font-weight: 600;
    flex-shrink: 0;
  }

  .sp-empty {
    opacity: 0.6;
    font-size: 0.9em;
    text-align: center;
    padding: 8px;
    grid-column: 1 / -1;
  }

  .sp-stat {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    font-size: 11px;
  }

  .sp-stats-grid {
    display: grid;
    grid-template-columns: 40% 1fr;
    gap: 3px;
    align-items: center;
    width: 100%;
    margin-top: 4px;
  }

  .sp-stat-icon {
    opacity: 0.6;
    text-align: center;
    font-size: 11px;
  }

  .sp-stat-value {
    font-weight: 600;
    font-size: 11px;
  }

  .sp-config-btn {
    width: 24px !important;
    height: 24px !important;
    border-radius: 6px;
    border: 1px solid rgba(255,255,255,0.12);
    background: rgba(255,255,255,0.06);
    cursor: pointer;
    display: grid;
    place-items: center;
    font-size: 0.75em;
    color: inherit;
    opacity: 0.7;
    transition: opacity 120ms;
  }

  .sp-config-btn:hover {
    opacity: 1;
  }
</style>