const { expect, assert } = require('chai');
const { mutate } = require('../../../src/methods');
const { StructureNode } = require('../../../src/objects/struct');

describe('Mutation methods test', () => {
  const struct = new StructureNode('test');
  struct.addChild(new StructureNode('1stlevel_0'));
  struct.addChild(new StructureNode('1stlevel_1'));
  struct.getInner().find((x) => x.getName() === '1stlevel_1').addChild(new StructureNode('2ndlevel_0'));
  describe('Create function', () => {
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
  });
  describe('delete function', () => {
    it('test methods MUTATE DELETE', () => {
      const myInput = ['DELETE', '1stlevel_1/2ndlevel_0'];
      assert.equal(struct.getInner()[struct.findChildIndex('1stlevel_1')].getInner().length, 2);
      mutate(struct, myInput);
      const result = struct.getInner()[struct.findChildIndex('1stlevel_1')];
      assert.equal(result.getInner().length, 1);
    });
    it('test methods invalid MUTATE DELETE', () => {
      const myInput = ['DELETE', '1stlevel_3/2ndlevel_0'];
      expect(mutate(struct, myInput)).equals(`Cannot delete ${myInput[1]} - 2ndlevel_0 does not exist`);
    });
  });
  describe('move function', () => {
    it('test methods MUTATE MOVE', () => {
      const myInput = ['MOVE', '1stlevel_1/2ndlevel_1', '1stlevel_0'];
      mutate(struct, myInput);
      const result = struct.getInner().find((x) => x.getName() === '1stlevel_1');
      expect(result.getInner().length).to.equal(0);
    });
  });
  it('test methods invalid option', () => {
    const myInput = ['ALTER', '1stlevel_1/2ndlevel_1'];
    expect(() => mutate(struct, myInput)).to.throw('invalid method');
  });
});
