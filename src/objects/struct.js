class StructureNode {
  inner;
  #name;
  constructor(value) {
    this.#name = value;
    this.inner = [];
  }

  getName() {
    return this.#name;
  }
  getInner() {
    return this.inner;
  }
  getChild(index) {
    return this.inner[index];
  }
  addChild(child) {
    this.inner.push(child);
  }
  removeChild(index) {
    this.inner.splice(index, 1); 
  }
  findChildIndex(name) {
    return this.inner.findIndex(x => x.getName() == name)
  }

};

module.exports={StructureNode};