
/* A simple module to fill a javascript template file with variables defined in
 * an object. There's no support for loops, etc.
 */

const readFileSync = require('fs').readFileSync;

const Template = {};

Template.fillFile = (templName, vars) => {
  const fileString = readFileSync(templName).toString();
  return Template.fillString(fileString, vars);
};

Template.fillString = (templStr, vars) => {
  const varsEval = Object.keys(vars).map(key =>
    `var ${key} = '${vars[key]}';`
  );

  templFilled = '';

  try {
    templFilled = eval(varsEval.join('') + '`' + templStr + '`');
  } catch (err) {
    console.error(err);
  }
  return templFilled;
};

module.exports = Template;
