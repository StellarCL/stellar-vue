---
'@stellar-vue-ui/cli': minor
---

Improve CLI defaults and auto-install dependencies.

- **Framework-aware default paths**: Vue projects now default to `src/`-prefixed paths (`./src/components/ui`, `./src/composables`, `./src/lib`, `./src/assets/css/variables.css`). Nuxt projects use root-level paths (`./components/ui`, etc.).
- **CSS variables path prompt**: The `init` command now asks where to place the CSS variables file, instead of silently hardcoding it.
- **Auto-install dependencies**: The `init`, `add`, and `deps --update` commands now automatically install npm dependencies using the detected package manager (pnpm, yarn, bun, or npm) instead of just printing the command.
