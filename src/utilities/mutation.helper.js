const validators = require('../validators');

/**
 * finds destination of the folder sent in the sufix.
 *
 * @param {StructureNode}  myStructure array containing folder structure
 * @param {string} sufix current route of the folder
 * MOVER A UTILIDADES. EQUIVALENTE A HELP
 * @returns {folder} current returns the location of the folder to be found.
 */
function findDestination(myStructure, sufix) {
  const folders = sufix.split('/');
  let now = folders.shift();
  if (folders.length === 0) {
    return validators.finder(now, myStructure);
  }
  let current = validators.finder(now, myStructure);
  while (folders.length > 0) {
    now = folders.shift();
    current = validators.finder(now, current);
  }
  return current;
}

/**
 * finds index of the folder searched
 *
 * @param {string} toFind name of folder to be found
 * @param {StructureNode}  myStructure array containing folder structure
 * @returns {int} index returns int with folder index. Otherwise a exception is returned.
 */
function find(name, myStructure) {
  const index = myStructure.findChildIndex(name);
  if (index === -1) {
    throw new Error('not found');
  } else {
    return index;
  }
}

module.exports = { find, findDestination };
