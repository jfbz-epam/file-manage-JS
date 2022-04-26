const { expect } = require('chai');
const { mutate } = require('../../../src/methods');
const { StructureNode } = require('../../../src/objects/struct');

describe('Mutation methods test', () => {
  describe('Create function', () => {
    const struct = new StructureNode('test');
    struct.addChild(new StructureNode('1stlevel_0'));
    struct.addChild(new StructureNode('1stlevel_1'));
    struct.getInner().find((x) => x.getName() === '1stlevel_1').addChild(new StructureNode('2ndlevel_0'));
    it('test methods MUTATE CREATE', () => {
      const myInput = ['CREATE', '1stlevel_1/2ndlevel_1'];
      mutate(struct, myInput);
      const result = struct.getInner().find((x) => x.getName() === '1stlevel_1');
      const child = result.getInner().find((x) => x.getName() === '2ndlevel_1');
      expect(child.getName()).to.equal('2ndlevel_1');
    });
    it('test methods invalid MUTATE CREATE', () => {
      const myInput = ['CREATE', '1stlevel_3/2ndlevel_1'];
      expect(mutate(struct, myInput)).equals('folder not found: 2ndlevel_1');
    });
    it('test methods MUTATE DELETE', () => {
      const myInput = ['DELETE', '1stlevel_1/2ndlevel_0'];
      mutate(struct, myInput);
      const result = struct.getInner().find((x) => x.getName() === '1stlevel_1');
      expect(result.getInner().length).to.equal(0);
    });
    it('test methods invalid MUTATE DELETE', () => {
      const myInput = ['DELETE', '1stlevel_3/2ndlevel_0'];
      expect(mutate(struct, myInput)).equals(`Cannot delete ${myInput[1]} - 2ndlevel_0 does not exist`);
    });
    it('test methods invalid option', () => {
      const myInput = ['ALTER', '1stlevel_1/2ndlevel_1'];
      expect(() => mutate(struct, myInput)).to.throw('invalid method');
    });
    it('test methods MUTATE MOVE', () => {
      const myInput = ['MOVE', '1stlevel_1/2ndlevel_0', '1stlevel_0'];
      mutate(struct, myInput);
      const result = struct.getInner().find((x) => x.getName() === '1stlevel_1');
      expect(result.getInner().length).to.equal(0);
    });
  });
});
