const { assert, expect } = require('chai');
const { StructureNode } = require('../../../src/objects/struct');
const { find, findDestination } = require('../../../src/utilities/mutation.helper');

describe('Utilities check: ', () => {
  describe('Check test Function: ', () => {
    const struct = new StructureNode('test');
    struct.addChild(new StructureNode('1stlevel_0'));
    struct.addChild(new StructureNode('1stlevel_1'));
    struct.getInner().find((x) => x.getName() === '1stlevel_1').addChild(new StructureNode('2ndlevel_0'));
    it('Enter a invalid child on root folder', () => {
      expect(() => find('1stlevel', struct)).to.throw('not found');
    });
    it('Enter a valid child on root folder', () => {
      const result = find('1stlevel_1', struct);
      assert.equal(result, 1);
    });
    it('invalid params 1', () => {
      expect(() => find(struct)).to.throw('invalid params');
    });
    it('invalid params 2', () => {
      expect(() => find('2ndlevel_0')).to.throw('invalid params');
    });
    it('invalid params 3', () => {
      expect(() => find()).to.throw('invalid params');
    });
  });
  describe('check findDestination function', () => {
    const struct = new StructureNode('test');
    struct.addChild(new StructureNode('1stlevel_0'));
    struct.addChild(new StructureNode('1stlevel_1'));
    struct.getInner().find((x) => x.getName() === '1stlevel_1').addChild(new StructureNode('2ndlevel_0'));
    it('find destination 1 level', () => {
      assert.equal(findDestination(struct, '1stlevel_0').getName(), '1stlevel_0');
    });
    it('find destination 2 levels', () => {
      assert.equal(findDestination(struct, '1stlevel_1/2ndlevel_0').getName(), '2ndlevel_0');
    });
    it('invalid params 1', () => {
      expect(() => findDestination(struct)).to.throw('invalid params');
    });
    it('invalid params 2', () => {
      expect(() => findDestination('1stlevel_1/2ndlevel_0')).to.throw('invalid params');
    });
    it('invalid params 3', () => {
      expect(() => findDestination()).to.throw('invalid params');
    });
  });
});
