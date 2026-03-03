---
'@stellar-vue-ui/cli': patch
---

Fix `update` command to write real component code instead of stub comments. The command now uses the same `COMPONENT_TEMPLATES` + `rewriteImports()` pipeline as `add`, syncs composable dependencies, and installs npm deps. Adds `--force` flag to pull latest template changes even when the lock file version already matches the registry.
