const { StructureNode } = require('../../../src/objects/struct');
const input = require('../../../src/inputParse');

describe('Structure utilities check: ', () => {
  describe('Check find Function: ', () => {
    const struct = new StructureNode('test');
    struct.addChild(new StructureNode('1stlevel_0'));
    struct.addChild(new StructureNode('1stlevel_1'));
    struct.getInner().find((x) => x.getName() === '1stlevel_1').addChild(new StructureNode('2ndlevel_0'));
    it('test invalid inputParse', () => {
      const myInput = ['ALTER'];
      input(myInput, struct);
    });
  });
});
