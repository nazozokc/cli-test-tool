#!/usr/bin/env node

import { execa } from 'execa';
import * as p from '@clack/prompts';
import { Command } from 'commander';


const runCLI = () => {
  const program = new Command;

  program.name("git-taiwa").description("git taiwa tool").version("v1.0.0");

  program
    .command("gt")
    .argument("<text>")
    .action(async (text) => {
      await execa("git", ["status"]);
      await execa("git", ["add", "."]);
      await execa("git", ["commit", "-m", text]);
      await execa("git", ["push"]);
    });

  program.parse();
};

runCLI();
