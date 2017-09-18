#!/usr/bin/env node

var download = require('download-git-repo')
var program = require('commander')
var path = require('path')
var ora = require('ora')
var home = require('user-home')
var tildify = require('tildify')
var chalk = require('chalk')
var inquirer = require('inquirer')
var figlet = require('figlet')
var ncp = require("ncp").ncp
var fs = require('fs')
var ejs = require('ejs')

console.log(chalk.green(figlet.textSync('Myfirease-cli', { horizontalLayout: 'full' })))

program
    .version(require('./../package').version)
    .usage('<command> <file-name>')
    .option('-c, --clone', 'use git clone')
    .parse(process.argv)

/**
 * Help.
 */

program.on('--help', function() {
    console.log()
    console.log('  Example:')
    console.log()
    console.log(chalk.gray('    # create a new project with Myfirebase'))
    console.log('    $ myfirebase new:project <project-name>')
    console.log()
    console.log(chalk.gray('    # create a new component in your project'))
    console.log('    $ myfirebase new:component <component-name>')
    console.log()
    console.log(chalk.gray('    # create a new middleware in your project'))
    console.log('    $ myfirebase new:middleware <middleware-name>')
    console.log()
})

function help() {
    program.parse(process.argv)
    if (program.args.length < 1) return program.help()
}

help()

/**
 * Settings.
 */

var rawName = program.args[0]
var inPlace = !rawName || rawName === '.'
var name = inPlace ? path.relative('../', process.cwd()) : rawName
var to = path.resolve(rawName || '.')
var clone = program.clone || false
var templateDir = path.join(__dirname, './../lib/scaffold')

var param = rawName.split(':')

function run() {
    switch (param[1]) {
        case 'component':
            var componentName = program.args[1] + ".vue"
            var componentDir = path.resolve("src/components/" + componentName)
            ncp(templateDir + "/component.vue", componentDir, function(error) {
                if (error) {
                    console.log(chalk.red(error))
                    return 1
                }
                console.log(chalk.green("a new component has been successfully created"));
            })
            break;

        case 'middleware':
            var middlewareName = program.args[1];
            var file = fs.readFileSync(path.join(__dirname, './../lib/template/middleware.js'), 'utf8')
            var result = ejs.render(file, { middleware: middlewareName })
            fs.writeFile(path.resolve("src/middlewares/" + middlewareName + '.js'), result, function(err) {
                if (err) {
                    console.log(chalk.red(err))
                    return 1
                }
                console.log(chalk.green("a new middleware has been successfully created"));
            })
            break;

        case 'project':
            var spinner = ora('downloading project')
            spinner.start()
            download("myfirebase/myfirebase", to, { clone: clone }, function(err) {
                spinner.stop()
                if (!err) { console.log(chalk.green(name + " has been successfully created.")) } else {
                    console.log(chalk.red('Failed to download repo : ' + err.message.trim()))
                }
            })
            break;
        default:
            break;
    }
}

// run commmand
run()