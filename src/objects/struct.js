class StructureNode {
  inner;
  #name;
  constructor(value) {
    this.#name = value;
    this.inner = [];
  }
  /**
  * Returns structure name
  * @returns {string} name
  */
  getName() {
    return this.#name;
  }
  /**
  * Returns inner contents of the structure
  * @returns {[]} returns array with inner contents
  */
  getInner() {
    return this.inner;
  }
  /**
  * fetch child structure from inner contents
  * @param {int} index index of child
  * @returns {StructureNode} returns child
  */
  getChild(index) {
    return this.inner[index];
  }
  /**
  * adds child structure to inner contents
  * @param {StructureNode} child structure to be added
  */
  addChild(child) {
    this.inner.push(child);
  }
  /**
  * removes child structure from inner contents
  * @param {int} index index of child to be removed
  */
  removeChild(index) {
    this.inner.splice(index, 1); 
  }
  /**
  * finds child structure index inside inner contents
  * @param {string} name name of child
  * @returns {int} child index
  */
  findChildIndex(name) {
    return this.inner.findIndex(x => x.getName() == name)
  }

};

module.exports={StructureNode};