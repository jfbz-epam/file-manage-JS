const readline = require('readline');
const inputParse = require('./src/inputParse');
const folder = require('./src/objects/folder');
const validators = require('./src/validators')
const fs = require('fs');

let myStructure = folder('root');
let fileName;

/**
 * performs request of the CLI
 *
 * @param {string} params line from the CLI
 */
function doRequest(params) {
  let command = params.split(' ');
  if (validators.validateMethod(command[0])==true){
    inputParse(command, myStructure.inside);  
  }
}

/**
 * reads 3rd argument from CLI. if empty message "filename cannot be empty" will
 * be displayed. otherwise it will read  file line by line. 
 *
 */
try {
  fileName=process.argv[2];
  const allFileContents = fs.readFileSync(fileName, 'utf-8');
  allFileContents.split(/\r?\n/).forEach(line =>  {
    doRequest(line);
  });
  process.exit(0);
} catch (error) {
  console.log(`filename cannot be empty`);
  process.exit(1);
}




