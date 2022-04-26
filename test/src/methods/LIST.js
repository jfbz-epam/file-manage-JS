const { list } = require('../../../src/methods');
const { StructureNode } = require('../../../src/objects/struct');

describe('list method test', () => {
  const struct = new StructureNode('test');
  struct.addChild(new StructureNode('1stlevel_0'));
  struct.addChild(new StructureNode('1stlevel_1'));
  struct.getInner().find((x) => x.getName() === '1stlevel_1').addChild(new StructureNode('2ndlevel_0'));
  it('test LIST inputParse', () => {
    list(struct, 0);
  });
});
