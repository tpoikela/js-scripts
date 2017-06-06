
const commandLineArgs = require('command-line-args');
const appendFileSync = require('fs').appendFileSync;

/* Script contains boilerplate for writing well-documented scripts with standard
 * switches. */
const Script = function({ optDefs, optDescr, description }) {
  if (optDefs) {
    this.optDefs = this.optDefs.concat(optDefs);
  }
  this.description = description;

  this.opts = commandLineArgs(this.optDefs);
  if (this.opts.help) {
    this.usage(0, this.optDefs, optDescr);
  }
};

//-------------------
// Script.prototype
//-------------------

Script.prototype.optDefs = [
  { name: 'verbose', alias: 'v', type: Boolean },
  { name: 'quiet', alias: 'q', type: Boolean },
  { name: 'debug', alias: 'd', type: Boolean },
  { name: 'help', alias: 'h', type: Boolean },
  { name: 'log', type: String }
];

/* Prints the usage for this script. */
Script.prototype.usage = function(retVal, optDefs, optDescr) {
  let usageStr = `${this.description}\n`;
  let descr = {
    verbose: 'Runs the script in verbose mode',
    help: 'Print this help message',
    quiet: 'Runs the script in quiet mode (no std output)',
    debug: 'Runs in debug mode'
  };

  if (optDescr) {
    descr = Object.assign(descr, optDescr);
  }

  optDefs.forEach(opt => {
    let { name, alias } = opt;
    alias = alias ? `|-${alias}` : '\t';
    usageStr += `\t--${name}${alias}\t${descr[name]}\n`;
  });

  console.log(usageStr);
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

module.exports = Script;
