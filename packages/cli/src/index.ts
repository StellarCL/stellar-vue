#!/usr/bin/env node
import { Command } from 'commander'
import { createRequire } from 'node:module'
import { initCommand } from './commands/init'

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

program.parse()
