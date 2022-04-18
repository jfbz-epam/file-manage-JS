/**
 * creates structure to replicate folder.
 *
 * @param {string} value name of the folder to be created
 * @returns {folder} returns folder named with value parameter.
 */
module.exports=(value) => {
  let nStruct = {name: value , inside: []} ;
  return nStruct;
}