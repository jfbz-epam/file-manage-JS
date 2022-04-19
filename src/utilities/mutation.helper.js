const validators = require('../validators');

/**
 * finds destination of the folder sent in the sufix.
 *
 * @param {[]}  arr array containing folder structure
 * @param {string} sufix current route of the folder
 * MOVER A UTILIDADES. EQUIVALENTE A HELP
 * @returns {folder} current returns the location of the folder to be found.
 */
 function findDestination(arr, sufix) {
    try {
      var folders=sufix.split('/');
      var now=folders.shift();
      if (folders.length==0) {
        return validators.finder(now,arr);
      }
      var current=validators.finder(now,arr);
      while (folders.length>0) {
        now=folders.shift();
        current=validators.finder(now,current);
      }  
      return current;
    } catch (error) {
      throw error;
    }
  }
  
  
  /**
   * finds index of the folder searched
   *
   * @param {string} toFind name of folder to be found
   * @param {[]}  arr array containing folder structure
   * @returns {int} index returns int with folder index. Otherwise a exception is returned.
   */
  function find(name, arr) {
    var index=arr.findChildIndex(name);
    if (index==-1){
      throw 'not found';
    }else{
      return index;  
    }
  }

  module.exports={find, findDestination};