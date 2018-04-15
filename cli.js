#!/usr/bin/env node

const program = require('commander')
const fs = require('fs-extra')
const utils = require('./utils')
const Site = require('./core')

const version = require('./package.json').version

program
  .version(version)
  
// Build the site
program
  .command('build')
  .description('build the site in the current directory')
  .action(build)

// Build the site
program
  .command('new')
  .description('creates a new site in the current directory')
  .action(() => {
    if (fs.readdirSync('./').length !== 0) {
      console.log('Directory Not Empty!')
      process.exit(1)
    }
    fs.copySync(__dirname + '/skeleton', './')
    console.log('Created A New Site!')
  })

program.parse(process.argv)

if (process.argv.length < 3) {
  program.help()
}

function build() {
  utils
    .getConfig()
    .then(config => new Site(config))
    .then(site => site.build())
    .catch(err => console.log(err))
}