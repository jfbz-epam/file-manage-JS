/**
 * method to print folder structure.
 *
 * @param {StructureNode}  myStructure array containing folder structure
 * @param {int} space determines amount of spaces on each print.
 */
function doList(myStructure, space) {
  myStructure.getInner().sort((a, b) => a.getName().localeCompare(b.getName()));
  let spaces = '';
  for (let j = 0; j < space; j += 1) {
    spaces += ' ';
  }
  for (let i = 0; i < myStructure.getInner().length; i += 1) {
    process.stdout.write(`${spaces + myStructure.getChild(i).getName()}\n`);
    if (myStructure.getChild(i).getInner().length > 0) {
      doList(myStructure.getChild(i), space + 2);
    }
  }
}

module.exports = { doList };
