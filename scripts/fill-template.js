#! /usr/bin/env node
/* eslint */

const disclaimer = require('./lib/disclaimer')();

const readFileSync = require('fs').readFileSync;
const appendFileSync = require('fs').appendFileSync;
const existsSync = require('fs').existsSync;

const commandLineArgs = require('command-line-args');
const Template = require('./lib/template');

const optDefs = [
    {name: 'file', alias: 'f', type: String, multiple: true, default: true},
    {name: 'out', alias: 'o', type: String},
    {name: 'force', type: Boolean},
    {name: 'json', type: String},
    {name: 'vars', type: String}
];

const opts = commandLineArgs(optDefs);

//if (opts.vars) {values = eval(opts.vars);}
if (opts.vars) {
    try {
        eval(`var values = ${opts.vars};`);
    }
    catch (err) {
        console.error(err.message);
    }
};

opts.file.forEach(file => {
    const templFilled = Template.fillFile(file, values);
    if (opts.out) {
        if (!existsSync(opts.out)) {
            appendFileSync(opts.out, templFilled);
        }
        else {
            console.error(`File ${opts.out} exists. Refusing to overwrite.`);
        }
    }
    else {
        console.log(templFilled);
    }
});

//console.log(`Filled template:\n${templFilled}`);
