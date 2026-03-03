---
'@stellar-vue-ui/cli': patch
---

Fix missing composables when adding components. The `add` command now copies composable files (e.g. `useFormField`, `useToast`) that components depend on and rewrites their import paths correctly.
