---
'@stellar-vue-ui/cli': patch
---

Fix `add` command to copy real component source files instead of empty placeholder stubs. The CLI now embeds all 56 component families and writes actual `.vue`, `.types.ts`, `.variants.ts`, and other source files. Import paths (`../../utils`) are automatically rewritten to match the user's configured `utilsDir`. The `init` command now also writes shared utils (`cn.ts`, `variants.ts`) and prints the required npm dependencies.
