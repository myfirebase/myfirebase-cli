#!/usr/bin/env node

var download = require('download-git-repo')
var program = require('commander')
var exists = require('fs').existsSync
var path = require('path')
var ora = require('ora')
var home = require('user-home')
var tildify = require('tildify')
var chalk = require('chalk')
var inquirer = require('inquirer')
var figlet = require('figlet')
program
    .usage('[project-name]')
    .option('-c, --clone', 'use git clone')
    .option('--offline', 'use cached template')

/**
 * Help.
 */

program.on('--help', function() {
    console.log('  Example:')
    console.log()
    console.log(chalk.gray('    # create a new project with Myfirebase'))
    console.log('    $ myfirebase-new my-project')
    console.log()
})

function help() {
    program.parse(process.argv)
    if (program.args.length < 1) return program.help()
}

console.log(chalk.green(figlet.textSync('Myfirease-cli', { horizontalLayout: 'full' })))

help()

/**
 * Settings.
 */

var rawName = program.args[0]
var inPlace = !rawName || rawName === '.'
var name = inPlace ? path.relative('../', process.cwd()) : rawName
var to = path.resolve(rawName || '.')
var clone = program.clone || false

/**
 * Run.
 */
function run() {
    var spinner = ora('downloading project')
    spinner.start()
    download("myfirebase/myfirebase", to, { clone: clone }, function(err) {
        spinner.stop()
        if (!err)
            console.log(chalk.green(name + " hase been created successfully."))
        console.log(chalk.red('Failed to download repo : ' + err.message.trim()))
    })
}

run()