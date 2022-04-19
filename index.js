const inputParse = require('./src/inputParse');
const validators = require('./src/validators')
const fs = require('fs');
const { StructureNode } = require('./src/objects/struct');




if (!process.argv[2]) throw new Error(`filename cannot be empty`);



/**
 * performs request of the CLI
 *
 * @param {string} params line from the CLI
 */
function doRequest(params, struct) {
  let command = params.split(' ');
  if (validators.validateMethod(command[0])){
    inputParse(command, struct);  
  }
}

/**
 *
 */
try {
  let myStructure = new StructureNode('root');
  let fileName=process.argv[2];
  const allFileContents = fs.readFileSync(fileName, 'utf-8');
  allFileContents.split(/\r?\n/).forEach(line =>  {
    doRequest(line, myStructure);
  });
  process.exit(0);
} catch (error) {
  throw error;
}




