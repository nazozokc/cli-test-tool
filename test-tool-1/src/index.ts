#!/usr/bin/env node

import { Command } from 'commander';
import { consola } from 'consola';

const program = new Command();

program
  .name('test-tool-1')
  .description('A CLI tool built with TypeScript, Commander, and Consola')
  .version('1.0.0');

program
  .command('hello')
  .description('Say hello')
  .argument('[name]', 'name to greet', 'World')
  .action((name: string) => {
    consola.success(`Hello, ${name}!`);
  });

program
  .command('info')
  .description('Display information')
  .action(() => {
    consola.info('This is a TypeScript CLI tool');
    consola.box('Built with Commander and Consola');
  });

program.parse();
