const readline = require('readline');
const inputParse = require('./src/inputParse');
const folder = require('./src/objects/folder');
const validators = require('./src/validators')
const fs = require('fs');

let myStructure = folder('root');

const read = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

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



const allFileContents = fs.readFileSync('script.txt', 'utf-8');
allFileContents.split(/\r?\n/).forEach(line =>  {
  doRequest(line);
});
