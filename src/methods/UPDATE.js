const folder = require('../objects/folder');
const validators = require('../validators');


/**
 * Handler of MOVE, CREATE and DELETE request.
 * 1st switch: performs operation for folders on root directory
 * 2nd switch: performs operation for folders on root subdirectory
 * 3rd switch: error messages.
 * @param {[]}  arr array containing folder structure
 * @param {string} params contains command from the CLI
 */
function doUpdate(arr, params) {
  try {
    var folders=params[1].split('/');
    var now=folders.shift();
    if (folders.length==0) {
      switch (params[0]) {
        case 'CREATE':  
          create(now, arr); 
          break;
        case 'DELETE': 
          remove(now, arr);     
          break;
        case 'MOVE':
          move(arr ,find(now, arr), params[2],arr);     
          break;
        default:
          break;
      }
      return;
    }
    var current=validators.finder(now,arr).inside;
    while (folders.length>1) {
      now=folders.shift();
      current=validators.finder(now,current).inside;
    }
    if(folders.length==1){
      now=folders.shift();
      switch (params[0]) {
        case 'CREATE':  
          create(now, current); 
          break;
        case 'DELETE': 
          remove(now, current);    
          break;
        case 'MOVE':
          move(current, find(now, current), params[2], arr);     
          break;
        default:
          break;
      }
    }  
  } catch (error) {
    switch (params[0]) {
      case 'CREATE':  
        console.log(`folder not found: ${now}`);
        break;
      case 'DELETE': 
        console.log(`Cannot delete ${params[1]} - ${now} does not exist`);  
        break;
      default:
        break;
    }
  }
}


/**
 * Creates folder at the array received with the name param.
 *
 * @param {[]}  arr array containing folder structure
 * @param {string} name contains name of the folder to be created.
 */
function create(name, arr) {
  const struct= folder(name);
  arr.push(struct);
}


/**
 * Removes folder that mathes name param at the array received.
 *
 * @param {[]}  arr array containing folder structure
 * @param {string} name contains name of the folder to be removed
 */
function remove(name, arr) {
  var index=arr.findIndex(x => x.name === name);
  if (index==-1){
    throw 'not found';
  }else{
    arr.splice(index, 1);  
  }
}


/**
 * finds destination of the folder sent in the sufix.
 *
 * @param {[]}  arr array containing folder structure
 * @param {string} sufix current route of the folder
 * @returns {folder} current returns the location of the folder to be found.
 */
function findDestination(arr, sufix) {
  try {
    var folders=sufix.split('/');
    var now=folders.shift();
    if (folders.length==0) {
      return validators.finder(now,arr).inside;
    }
    var current=validators.finder(now,arr).inside;
    while (folders.length>0) {
      now=folders.shift();
      current=validators.finder(now,current).inside;
    }  
    return current;
  } catch (error) {
  }
}


/**
 * finds index of the folder searched
 *
 * @param {string} toFind name of folder to be found
 * @param {[]}  arr array containing folder structure
 * @returns {int} index returns int with folder index. Otherwise a exception is returned.
 */
function find(toFind, arr) {
  var index=arr.findIndex(x => x.name === toFind);
  if (index==-1){
    throw 'not found';
  }else{
    return index;  
  }
}

/**
 * Moves folder located at current that matches index to the destination received.
 *
 * @param {[]} current folder containing file to be moved.
 * @param {int} index index of the folder to be moved
 * @param {string} destination path for the new location
 * @param {[]}  arr array containing folder structure
 */
function move(current, index, destination, arr) {
  findDestination(arr, destination).push(current[index]);
  current.splice(index, 1);   
}

module.exports= {doUpdate};