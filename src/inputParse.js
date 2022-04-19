const methods = require('./methods');

/**
 * Receives root folder structure and line from the CLI. 
 * Then they are used to determine operation and execute it.
 * CREATE, DELETE and MOVE are filtered again inside doUpdate method.
 *
 * @param {[]}  arr array containing folder structure
 * @param {string} line command received from CLI
 */
module.exports=(line, myStructure) => {
  console.log(line.join(' '));
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
      break;
  }
}