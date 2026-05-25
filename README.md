![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg) [![ko-fi](https://img.shields.io/badge/Ko--fi-Support%20me-FF5E5B?logo=kofi&logoColor=white)](https://ko-fi.com/shua)

# SHARDS Party

A party overview panel for the SHARDS Dock. Displays a card for each player character — portrait, health bar, and key stats — all at a glance without opening any sheets.

> **Requires:** [SHARDS Core](https://github.com/dev-shua/shards-core)

---

## Features

- **One card per player character** — portrait, name, and configurable stats
- **HP bar** — color-coded by health status: healthy, scratched, wounded, or critical
- **Inspiration indicator** — a gold star overlays the portrait when a character has inspiration
- **Configurable stats** — choose which fields to display: AC, Passive Perception, Passive Investigation, Speed, Initiative

---

## Installation

In Foundry VTT, go to **Add-on Modules → Install Module** and paste the manifest URL:

```
https://raw.githubusercontent.com/dev-shua/shards-party/main/public/module.json
```

Make sure **SHARDS Core** is installed and enabled first.

---

## Compatibility

| Foundry VTT | Verified |
|-------------|----------|
| v14         | ✔        |

> Built for **D&D 5e**. Stat fields rely on the dnd5e system data structure and may not display correctly with other systems.