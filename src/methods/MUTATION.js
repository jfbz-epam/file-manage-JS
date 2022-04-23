const { StructureNode } = require('../objects/struct');
const validators = require('../validators');
const { find, findDestination } = require('../utilities/mutation.helper');

/**
 * Creates folder at the array received with the name param.
 *
 * @param {StructureNode}  myStructure contains parent folder structure
 * @param {string} name contains name of the folder to be created.
 */
function create(name, myStructure) {
  const struct = new StructureNode(name);
  myStructure.addChild(struct);
}

/**
 * Removes folder that mathes name param at the array received.
 *
 * @param {StructureNode}  myStructure contains parent folder structure
 * @param {string} name contains name of the folder to be removed
 */
function remove(name, myStructure) {
  myStructure.removeChild(find(name, myStructure));
}

/**
 * Moves folder located at current that matches index to the destination received.
 *
 * @param {StructureNode} current structure containing folder to be moved.
 * @param {int} index index of the folder to be moved
 * @param {string} destination path for the new location
 * @param {StructureNode}  myStructure contains parent folder structure
 */
function move(current, index, destination, myStructure) {
  findDestination(myStructure, destination).addChild(current.getChild(index));
  current.removeChild(index);
}

/**
 * Handler of MOVE, CREATE and DELETE request.
 * 1st switch: sort mutations
 * 2nd switch: error messages.
 * @param {StructureNode}  myStructure array containing folder structure
 * @param {string} params contains command from the CLI
 */
function mutate(myStructure, params) {
  let current = myStructure;
  const folders = params[1].split('/');
  let now = folders.shift();
  try {
    while (folders.length > 0) {
      current = validators.finder(now, current);
      now = folders.shift();
    }
    switch (params[0]) {
      case 'CREATE':
        create(now, current);
        break;
      case 'DELETE':
        remove(now, current);
        break;
      case 'MOVE':
        move(current, find(now, current), params[2], myStructure);
        break;
      default:
        throw new Error('invalid method');
    }
    return 1;
  } catch (error) {
    switch (params[0]) {
      case 'CREATE':
        process.stdout.write(`folder not found: ${now}\n`);
        return `folder not found: ${now}`;
      case 'DELETE':
        process.stdout.write(`Cannot delete ${params[1]} - ${now} does not exist\n`);
        return `Cannot delete ${params[1]} - ${now} does not exist`;
      default:
        throw error;
    }
  }
}

module.exports = { mutate };
