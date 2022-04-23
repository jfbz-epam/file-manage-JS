/**
 * checks if folder to be searched exists in the received object array.
 *
 * @param {string} toSearch folder name to be found.
 * @param {StructureNode}  struct array containing folder structure
 * @returns {folder} if found returns the folder object searched, otherwise returns undefined.
 */
module.exports = (toSearch, struct) => struct.getInner().find((x) => x.getName() === toSearch);
