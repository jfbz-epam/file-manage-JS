/**
 * method to print folder structure.
 *
 * @param {[]}  arr array containing folder structure
 * @param {int} space determines amount of spaces on each print.
 */
function doList (arr, space) {
  arr.getInner().sort((a, b) => a.getName().localeCompare(b.getName()))
  let spaces = ''
  for (let j = 0; j < space; j++) {
    spaces = spaces + ' '
  }
  for (let i = 0; i < arr.getInner().length; i++) {
    console.log(spaces + arr.getChild(i).getName())
    if (arr.getChild(i).getInner().length > 0) {
      doList(arr.getChild(i), space + 2)
    }
  }
}

module.exports = { doList }
