const fs = require('fs');
const inputParse = require('./src/inputParse');
const validators = require('./src/validators');
const { StructureNode } = require('./src/objects/struct');

if (!process.argv[2]) throw new Error('filename cannot be empty');

/**
 * performs request of the CLI
 * @param {string} params line from the CLI
 * @param {StructureNode} struct root structure
 */
function doRequest(params, struct) {
  const command = params.split(' ');
  if (validators.validateMethod(command[0])) {
    inputParse(command, struct);
  }
}

const myStructure = new StructureNode('root');
const fileName = process.argv[2];
const allFileContents = fs.readFileSync(fileName, 'utf-8');
allFileContents.split(/\r?\n/).forEach((line) => {
  doRequest(line, myStructure);
});
process.exit(0);
