
const getUsage = require('command-line-usage');
const commandLineArgs = require('command-line-args');
const appendFileSync = require('fs').appendFileSync;

/* Script contains boilerplate for writing well-documented scripts with standard
 * switches. */
const Script = function({ optDefs, optDescr, description }) {
  if (optDefs) {
    this.optDefs = this.optDefs.concat(optDefs);
  }
  this.description = description;

  this.optDescr = Object.assign(this.optDescr, optDescr);

  this.opts = commandLineArgs(this.optDefs);
  this.userSections = [];
  if (this.opts.help) {
    throw new Error(this.usage());
  }
};

//-------------------
// Script.prototype
//-------------------

// Standard option definitions
Script.prototype.optDefs = [
  { name: 'verbose', alias: 'v', type: Boolean },
  { name: 'quiet', alias: 'q', type: Boolean },
  { name: 'debug', alias: 'd', type: Boolean },
  { name: 'help', alias: 'h', type: Boolean },
  { name: 'log', type: String }
];

// Descriptions for standard options
Script.prototype.optDescr = {
  verbose: 'Runs the script in verbose mode',
  help: 'Print this help message',
  quiet: 'Runs the script in quiet mode (no std output)',
  debug: 'Runs in debug mode',
  log: 'Log all diagnostics output into specified file.'
};

Script.prototype.exitWithUsage = function(msg, exitVal = 1) {
  console.error(`ERROR: ${msg}\n${this.usage()}`);
  process.exit(exitVal);
};

Script.prototype.throwWithUsage = function(msg) {
  throw new Error(`${msg}\n${this.usage()}`);
};

/* Prints the usage for this script. */
Script.prototype.usage = function() {
  let usageStr = `${this.description}\n`;

  this.optDefs.forEach(opt => {
    let { name, alias } = opt;
    alias = alias ? `|-${alias}` : '\t';
    if (this.optDescr[name]) {
      usageStr += `\t--${name}${alias}\t${this.optDescr[name]}\n`;
    }
    else {
      usageStr += `\t--${name}${alias}\tNo description!!\n`;
    }
  });

  return usageStr;
};

Script.prototype.msg = function(msg) {
  if (!this.opts.quiet) {
    this.out(`[INFO] ${msg}`);
  }
};

Script.prototype.vmsg = function(msg) {
  if (this.opts.verbose) {
    this.out(`[VINFO] ${msg}`);
  }
};

Script.prototype.error = function(msg) {
  this.out(`[ERROR] ${msg}`);
};

Script.prototype.debug = function(msg) {
  this.out(`[DEBUG] ${msg}`);
};

Script.prototype.out = function(msg) {
  const now = new Date();
  const datedMessage = `${now}: ${msg}`;
  if (this.opts.log) {
    appendFileSync(this.opts.log, datedMessage);
  }
  else {
    console.error(datedMessage);
  }
};

Script.prototype.initUsage = function() {
  const optSection = {
    header: 'Options',
    content: 'Placeholder for actual content'
  };
  const sections = [
    {
      header: this.header,
      content: this.description
    },
    optSection,
    ...this.userSections
  ];
  this.longUsage = getUsage(sections);
};

Script.prototype.addSection = function(sect) {
  if (!sect.header) {
    throw new Error('User section must contain a header');
  }
  if (!sect.content) {
    throw new Error('User section must have content.');
  }
  this.userSections.push(sect);
};

module.exports = Script;
