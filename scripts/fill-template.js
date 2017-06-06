#! /usr/bin/env node
/* eslint */

require('../lib/disclaimer')();

const appendFileSync = require('fs').appendFileSync;
const existsSync = require('fs').existsSync;

const Script = require('../lib/script');
const Template = require('../lib/template');

const optDefs = [
  { name: 'file', alias: 'f', type: String, multiple: true, defaultOption: true },
  { name: 'out', alias: 'o', type: String },
  { name: 'force', type: Boolean },
  { name: 'json', type: String },
  { name: 'vars', type: String }
];

const optDescr = {

};

const description = 'The script fills templates files.';
const s = new Script({ optDefs, optDescr, description });

s.addSection({ header: 'A test', content: 'Content test' });
if (!s.opts.file) {
  s.exitWithUsage('Specify input file with --file|-f!');
}

let values;

s.run = function() {
  if (s.opts.vars) {
    try {
      /* eslint no-eval: 0 */
      eval(`values = ${s.opts.vars};`);
    }
    catch (err) {
      console.error(err.message);
    }
  }

  s.opts.file.forEach(file => {
    const templFilled = Template.fillFile(file, values);
    if (s.opts.out) {
      if (!existsSync(s.opts.out)) {
        appendFileSync(s.opts.out, templFilled);
      }
      else {
        console.error(`File ${s.opts.out} exists. Refusing to overwrite.`);
      }
    }
    else {
      console.log(templFilled);
    }
  });
};

module.exports = s;
