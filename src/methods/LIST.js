/**
 * method to print folder structure.
 *
 * @param {[]}  arr array containing folder structure
 * @param {int} space determines amount of spaces on each print.
 */
function doList(arr, space) {
  arr.sort((a,b) => a.name.localeCompare(b.name));
  for (let i=0; i < arr.length; i++){
    let spaces='';
    for (let j=0; j < space; j++){
      spaces=spaces+' ';
    }      
    console.log(spaces+arr[i].name);
    if(arr[i].inside.length>0){
      doList(arr[i].inside, space+2);
    }
  }  
}

module.exports= {doList};