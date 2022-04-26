const { assert, expect } = require('chai');
const { StructureNode } = require('../../../src/objects/struct');

describe('structure functions check', () => {
  describe('getInner function', () => {
    const struct = new StructureNode('test');
    it('test function with empty inner array', () => {
      const result = struct.getInner().length;
      assert.equal(result, 0);
    });
    it('test function with 2 childs in array', () => {
      struct.addChild(new StructureNode('1stlevel_0'));
      struct.addChild(new StructureNode('1stlevel_1'));
      const result = struct.getInner().length;
      assert.equal(result, 2);
    });
  });
  describe('getChild function', () => {
    const struct = new StructureNode('test');
    it('get a valid child', () => {
      struct.addChild(new StructureNode('1stlevel_0'));
      const result = struct.getChild(0);
      assert.equal(result.getName(), '1stlevel_0');
    });
    it('get a invalid child', () => {
      const result = struct.getChild(2);
      assert.equal(result, undefined);
    });
    it('invalid params', () => {
      expect(() => struct.getChild('Javascript')).to.throw('invalid index');
    });
    it('empty params', () => {
      expect(() => struct.getChild()).to.throw('invalid index');
    });
  });
  describe('removeChild function', () => {
    const struct = new StructureNode('test');
    it('remove a invalid child', () => {
      assert.equal(struct.removeChild(2), false);
    });
    it('remove a valid child', () => {
      struct.addChild(new StructureNode('1stlevel_0'));
      struct.addChild(new StructureNode('1stlevel_1'));
      assert.equal(struct.removeChild(1), true);
    });
  });
  describe('getName function', () => {
    const struct = new StructureNode('test');
    it('function call', () => {
      assert.equal(struct.getName(), 'test');
    });
    it('function call invalid name', () => {
      assert.notEqual(struct.getName(), 'testA');
    });
  });
  describe('addChild function', () => {
    const struct = new StructureNode('test');
    it('insert valid child', () => {
      struct.addChild(new StructureNode('1stlevel_0'));
      assert.equal(struct.getInner().length, 1);
    });
    it('insert invalid child empty params', () => {
      expect(() => struct.addChild()).to.throw('invalid object');
    });
    it('insert invalid child invalid param', () => {
      expect(() => struct.addChild(1)).to.throw('invalid object');
    });
  });
});
