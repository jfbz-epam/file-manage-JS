const { assert, expect } = require('chai');
const { describe } = require('mocha');
const input = require('../../src/inputParse');
const { StructureNode } = require('../../src/objects/struct');

describe('inputParse test', () => {
  describe('inputParse CREATE option', () => {
    const struct = new StructureNode('test');
    it('input with invalid parent folder', () => {
      const myInput = ['CREATE', '1stlevel_3/2ndlevel_1'];
      input(myInput, struct);
      assert.equal(struct.getInner().length, 0);
    });
    it('input parser create folder on root', () => {
      assert.equal(struct.getInner().length, 0);
      const myInput = ['CREATE', '1stlevel_3'];
      input(myInput, struct);
      assert.equal(struct.getInner().length, 1);
    });
    it('input parser create without struct', () => {
      const myInput = ['CREATE'];
      expect(() => input(myInput)).to.throw('invalid params for CREATE method');
    });
    it('input parser create with too many params', () => {
      const myInput = ['CREATE', 'aa', 'bb'];
      expect(() => input(myInput)).to.throw('invalid params for CREATE method');
    });
  });
  describe('inputParse DELETE option', () => {
    const struct = new StructureNode('test');
    struct.addChild(new StructureNode('1stlevel_3'));
    it('input parser delete folder on root', () => {
      assert.equal(struct.getInner().length, 1);
      const myInput = ['DELETE', '1stlevel_3'];
      input(myInput, struct);
      assert.equal(struct.getInner().length, 0);
    });
    it('input parser delete without struct', () => {
      const myInput = ['DELETE'];
      expect(() => input(myInput)).to.throw('invalid params for DELETE method');
    });
    it('input parser delete with too many params', () => {
      const myInput = ['DELETE', 'aa', 'bb'];
      expect(() => input(myInput)).to.throw('invalid params for DELETE method');
    });
  });
  describe('inputParse MOVE option', () => {
    const struct = new StructureNode('test');
    struct.addChild(new StructureNode('1stlevel_0'));
    struct.addChild(new StructureNode('1stlevel_1'));
    struct.getInner()[struct.findChildIndex('1stlevel_0')].addChild(new StructureNode('2ndlevel_0'));
    it('input parser move without 2 folders', () => {
      const myInput = ['MOVE'];
      expect(() => input(myInput)).to.throw('invalid params for MOVE method');
    });
    it('input parser move without 1 folder ', () => {
      const myInput = ['MOVE', 'aa/bb'];
      expect(() => input(myInput)).to.throw('invalid params for MOVE method');
    });
    it('input parser delete with too many params', () => {
      const myInput = ['MOVE', 'aa', 'bb', 'cc'];
      expect(() => input(myInput)).to.throw('invalid params for MOVE method');
    });
    it('input parser move', () => {
      assert.equal(struct.getInner()[struct.findChildIndex('1stlevel_0')].getInner().length, 1);
      assert.equal(struct.getInner()[struct.findChildIndex('1stlevel_1')].getInner().length, 0);
      const myInput = ['MOVE', '1stlevel_0/2ndlevel_0', '1stlevel_1'];
      input(myInput, struct);
      assert.equal(struct.getInner()[struct.findChildIndex('1stlevel_0')].getInner().length, 0);
      assert.equal(struct.getInner()[struct.findChildIndex('1stlevel_1')].getInner().length, 1);
    });
  });
  describe('inputParse LIST option', () => {
    const struct = new StructureNode('test');
    struct.addChild(new StructureNode('1stlevel_0'));
    struct.addChild(new StructureNode('1stlevel_1'));
    struct.getInner()[struct.findChildIndex('1stlevel_0')].addChild(new StructureNode('2ndlevel_0'));
    it('input parser list with too many params', () => {
      const myInput = ['LIST', 'aa', 'bb', 'cc'];
      expect(() => input(myInput)).to.throw('invalid params for LIST method');
    });
    it('input parser list', () => {
      const myInput = ['LIST'];
      input(myInput, struct);
    });
  });
  it('input parser without line', () => {
    const struct = new StructureNode('test');
    expect(() => input(struct)).to.throw('line.join is not a function');
  });
  it('input parser without params', () => {
    expect(() => input()).to.throw("Cannot read properties of undefined (reading '0')");
  });
  it('test invalid inputParse method without struct', () => {
    // const struct = new StructureNode('test');
    const myInput = ['ALTER'];
    expect(() => input(myInput)).to.throw('invalid method');
  });
  it('test invalid inputParse method with struct', () => {
    const struct = new StructureNode('test');
    const myInput = ['ALTER'];
    expect(() => input(myInput, struct)).to.throw('invalid method');
  });
});
