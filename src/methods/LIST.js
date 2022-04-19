
/**
 * method to print folder structure.
 *
 * @param {StructureNode}  myStructure array containing folder structure
 * @param {int} space determines amount of spaces on each print.
 */
function doList (myStructure, space) {
  myStructure.getInner().sort((a, b) => a.getName().localeCompare(b.getName()))
  let spaces = ''
  for (let j = 0; j < space; j++) {
    spaces = spaces + ' '
  }
  for (let i = 0; i < myStructure.getInner().length; i++) {
    console.log(spaces + myStructure.getChild(i).getName())
    if (myStructure.getChild(i).getInner().length > 0) {
      doList(myStructure.getChild(i), space + 2)
    }
  }
}

module.exports = { doList }
