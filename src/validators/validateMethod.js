const methods= require('../consts/methods');


/**
 * checks if method received by CLI is valid. if is invalid returns 
 * boolean marked as false to be handled.
 * @param {string} method operation received from the CLI
 * @returns {boolean} status, if method is invalid status flag is changed to false
 */
module.exports=(method) => {
  return methods.includes(method);
}