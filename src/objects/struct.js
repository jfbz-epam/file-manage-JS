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
    if (arguments.length !== this.getName.length) {
      throw new Error('invalid params');
    }
    return this.#name;
  }

  /**
  * Returns inner contents of the structure
  * @returns {[]} returns array with inner contents
  */
  getInner() {
    if (arguments.length !== this.getInner.length) {
      throw new Error('invalid params');
    }
    return this.inner;
  }

  /**
  * fetch child structure from inner contents
  * @param {int} index index of child
  * @returns {StructureNode} returns child
  */
  getChild(index) {
    if (arguments.length !== this.getChild.length) {
      throw new Error('invalid params');
    } else if (Number.isNaN(parseInt(index, 10))) {
      throw new Error('invalid index');
    } else {
      return this.inner[index];
    }
  }

  /**
  * adds child structure to inner contents
  * @param {StructureNode} child structure to be added
  */
  addChild(child) {
    if (arguments.length !== this.addChild.length) {
      throw new Error('invalid params');
    }
    try {
      child.getClassName();
      this.inner.push(child);
      return 'added';
    } catch (error) {
      throw new Error('invalid object');
    }
  }

  getClassName() {
    return this.constructor.name;
  }

  /**
  * removes child structure from inner contents
  * @param {int} index index of child to be removed
  */
  removeChild(index) {
    if (arguments.length !== this.removeChild.length) {
      throw new Error('invalid params');
    } else if (Number.isNaN(parseInt(index, 10))) {
      throw new Error('invalid index');
    } else {
      return this.inner.splice(index, 1).length === 1;
    }
  }

  /**
  * finds child structure index inside inner contents
  * @param {string} name name of child
  * @returns {int} child index
  */
  findChildIndex(name) {
    if (arguments.length > this.findChildIndex.length || arguments.length === 0) {
      throw new Error('invalid params');
    } else {
      return this.inner.findIndex((x) => x.getName() === name);
    }
  }
}

module.exports = { StructureNode };
