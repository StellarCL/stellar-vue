#!/usr/bin/env node
import { Command } from 'commander'
import { createRequire } from 'node:module'
import { initCommand } from './commands/init'
import { addCommand } from './commands/add'
import { updateCommand } from './commands/update'
import { removeCommand } from './commands/remove'
import { listCommand } from './commands/list'
import { registerThemeCommand } from './commands/theme'
import { infoCommand } from './commands/info'
import { depsCommand } from './commands/deps'
import { auditCommand } from './commands/audit'

const require = createRequire(import.meta.url)
const pkg = require('../package.json') as { version: string }

const program = new Command()

program
  .name('stellar-ui')
  .description('CLI for Stellar Vue UI component library')
  .version(pkg.version)

program
  .command('init')
  .description('Initialize Stellar UI in your project')
  .option('-y, --yes', 'Skip prompts and use defaults')
  .option('--cwd <cwd>', 'Working directory', process.cwd())
  .action(initCommand)

program
  .command('add [components...]')
  .description('Add components to your project')
  .option('-y, --yes', 'Skip confirmation prompts')
  .option('--overwrite', 'Overwrite existing components')
  .option('--cwd <cwd>', 'Working directory', process.cwd())
  .action(addCommand)

program
  .command('update [components...]')
  .description('Update installed components')
  .option('-y, --yes', 'Skip confirmation prompts')
  .option('-a, --all', 'Update all installed components')
  .option('--cwd <cwd>', 'Working directory', process.cwd())
  .action(updateCommand)

program
  .command('remove <components...>')
  .description('Remove components from your project')
  .option('-y, --yes', 'Skip confirmation prompts')
  .option('--cwd <cwd>', 'Working directory', process.cwd())
  .action(removeCommand)

program
  .command('list')
  .description('List available or installed components')
  .option('-i, --installed', 'Only show installed components')
  .option('-c, --category <category>', 'Filter by category')
  .option('--cwd <cwd>', 'Working directory', process.cwd())
  .action(listCommand)

// Theme & utility commands
registerThemeCommand(program)

program
  .command('info <component>')
  .description('Show component details')
  .option('--cwd <cwd>', 'Working directory', process.cwd())
  .action(infoCommand)

program
  .command('deps')
  .description('Check project dependencies')
  .option('-u, --update', 'Show install command for missing deps')
  .option('--cwd <cwd>', 'Working directory', process.cwd())
  .action(depsCommand)

program
  .command('audit')
  .description('Audit accessibility of your theme')
  .option('--contrast', 'Check color contrast ratios')
  .option('--keyboard', 'Check keyboard navigation')
  .option('--cwd <cwd>', 'Working directory', process.cwd())
  .action(auditCommand)

program.parse()
