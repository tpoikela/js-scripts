#! /usr/bin/env node

const scriptName = 'Test';

const Script = require('../lib/js-scripts');
const description = `Usage: ./${scriptName} [-vqdh] <args>`;

const optDefs = [
    // Your custom switches/flags
];

const optDescr = {
    // Describe your custom switches here
};
const s = new Script({ optDefs, optDescr, description });

// TODO: Your main script code goes here

//---------------------------------------------------------------------------
// HELPER FUNCTIONS (if needed)
//---------------------------------------------------------------------------

