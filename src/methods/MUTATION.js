const { StructureNode } = require('../objects/struct')
const validators = require('../validators')
const { find, findDestination } = require('../utilities/mutation.helper')

/**
 * Handler of MOVE, CREATE and DELETE request.
 * 1st switch: performs operation for folders on root directory
 * 2nd switch: performs operation for folders on root subdirectory
 * 3rd switch: error messages.
 * @param {[]}  arr array containing folder structure
 * @param {string} params contains command from the CLI
 */
function mutate (arr, params) {
  let current = arr
  const folders = params[1].split('/')
  let now = folders.shift()
  try {
    while (folders.length > 0) {
      current = validators.finder(now, current)
      now = folders.shift()
    }
    switch (params[0]) {
      case 'CREATE':
        create(now, current)
        break
      case 'DELETE':
        remove(now, current)
        break
      case 'MOVE':
        move(current, find(now, current), params[2], arr)
        break
      default:
        break
    }
  } catch (error) {
    switch (params[0]) {
      case 'CREATE':
        console.log(`folder not found: ${now}`)
        break
      case 'DELETE':
        console.log(`Cannot delete ${params[1]} - ${now} does not exist`)
        break
      default:
        break
    }
  }
}

/**
 * Creates folder at the array received with the name param.
 *
 * @param {[]}  arr array containing folder structure
 * @param {string} name contains name of the folder to be created.
 */
function create (name, arr) {
  const struct = new StructureNode(name)
  arr.addChild(struct)
}

/**
 * Removes folder that mathes name param at the array received.
 *
 * @param {[]}  arr array containing folder structure
 * @param {string} name contains name of the folder to be removed
 */
function remove (name, arr) {
  arr.removeChild(find(name, arr))
}

/**
 * Moves folder located at current that matches index to the destination received.
 *
 * @param {[]} current folder containing file to be moved.
 * @param {int} index index of the folder to be moved
 * @param {string} destination path for the new location
 * @param {[]}  arr array containing folder structure
 */
function move (current, index, destination, arr) {
  findDestination(arr, destination).addChild(current.getChild(index))
  current.removeChild(index)
}

module.exports = { mutate }
