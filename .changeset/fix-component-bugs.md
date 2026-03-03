---
'@stellar-vue-ui/core': patch
'@stellar-vue-ui/cli': patch
---

Fix five component bugs found during evaluation:

- Card default variant now has a visible border
- AppShell uses row flex direction for proper sidebar layout
- SidebarMenuButton respects the asChild prop
- Accordion height animations now work (added missing @utility directives)
- DataTable uses design token classes instead of hardcoded colors
