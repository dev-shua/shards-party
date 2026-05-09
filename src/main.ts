import { registerSettings } from "@core/settings";
import { mount } from "svelte";
import PartyPanel from "@ui/PartyPanel.svelte";
import log from "@utils/logger";
import { initPartyStore } from "@ui/partyStore";

Hooks.once("init", () => {
  log.i`init`;
  registerSettings();

  Hooks.once("shards-core:ready", () => {
    log.i`shards-core ready — registering party panel`;
    (game as any).shardsCore?.registerTool({
      id: "party",
      icon: "fa-solid fa-users",
      title: game.i18n.localize("SP.Panel.Title"),
      order: 0,
      render: (container: HTMLElement) => {
        mount(PartyPanel, { target: container });
      },
    });
  });
});

Hooks.once("ready", () => {
  log.i`ready`;
  initPartyStore();
});