const { assert } = require('chai');
const { describe } = require('mocha');
const input = require('../../src/inputParse');
const { StructureNode } = require('../../src/objects/struct');

describe('inputParse test', () => {
  const struct = new StructureNode('test');
  it('input with invalid parent folder', () => {
    const myInput = ['CREATE', '1stlevel_3/2ndlevel_1'];
    input(myInput, struct);
    assert.equal(struct.getInner().length, 0);
  });
  it('input parser create folder on root', () => {
    const myInput = ['CREATE', '1stlevel_3'];
    input(myInput, struct);
    assert.equal(struct.getInner().length, 1);
  });
});
