
const expect = require('chai').expect;
const Template = require('../../lib/template');

describe('Template', () => {
  it('Fills template values in a string ', () => {
    const str =  Template.fillString('${myName}', {myName: 'TestName'});
    expect(str).to.equal('TestName');
  });

  it('Does not fill escaped template values in a string ', () => {
    const testStr = '\\${myName}'; // Needs double \ to preserve one of them
    const str =  Template.fillString(testStr, {myName: 'TestName'});
    expect(str).to.equal('${myName}');
  });

  it('should throw if a variable is not defined', () => {
    const testStr = '${varNotGiven}'; // Needs double \ to preserve one of them
    const testFunc = Template.fillString.bind(testStr, {myName: 'TestName'});
    expect(testFunc).to.throw();
  });
});
