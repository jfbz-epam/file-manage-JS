const methods = require('./methods');
const inputParseHelper = require('./utilities/inputParse.helper');

/**
 * Receives root folder structure and line from the CLI.
 * Then they are used to determine operation and execute it.
 * CREATE, DELETE and MOVE are filtered again inside doUpdate method.
 *
 * @param {StructureNode}  myStructure root folder structure
 * @param {string} line command received from CLI
 */
module.exports = (line, myStructure) => {
  inputParseHelper(line);
  process.stdout.write(`${line.join(' ')}\n`);
  switch (line[0]) {
    case 'CREATE':
    case 'DELETE':
    case 'MOVE':
      methods.mutate(myStructure, line);
      break;
    case 'LIST':
      methods.list(myStructure, 0);
      break;
    default:
      throw new Error('invalid method');
  }
};
