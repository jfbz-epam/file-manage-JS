const { assert, expect } = require('chai');
const methods = require('../../../src/consts/methods');
const { StructureNode } = require('../../../src/objects/struct');
const { find, findDestination } = require('../../../src/utilities/mutation.helper');
const { list, mutate } = require('../../../src/methods');
const input = require('../../../src/inputParse');
const { validateMethod } = require('../../../src/validators');

describe('Structure utilities check: ', () => {
  describe('Check find Function: ', () => {
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
    it('check inner fetch', () => {
      const result = struct.getInner().length;
      assert.equal(result, 2);
    });
    it('get a valid child', () => {
      const result = struct.getChild(0);
      assert.equal(result.getName(), '1stlevel_0');
    });
    it('get a invalid child', () => {
      const result = struct.getChild(2);
      assert.equal(result, undefined);
    });
    it('find destination 1 level', () => {
      assert.equal(findDestination(struct, '1stlevel_0').getName(), '1stlevel_0');
    });
    it('find destination 2 levels', () => {
      assert.equal(findDestination(struct, '1stlevel_1/2ndlevel_0').getName(), '2ndlevel_0');
    });
    it('test LIST inputParse', () => {
      const myInput = ['LIST'];
      input(myInput, struct);
    });
    it('test invalid inputParse', () => {
      const myInput = ['ALTER'];
      input(myInput, struct);
    });
    it('test methods MUTATE CREATE', () => {
      const myInput = ['CREATE', '1stlevel_1/2ndlevel_1'];
      input(myInput, struct);
      const result = struct.getInner().find((x) => x.getName() === '1stlevel_1');
      const child = result.getInner().find((x) => x.getName() === '2ndlevel_1');
      expect(child.getName()).to.equal('2ndlevel_1');
    });
    it('test methods MUTATE DELETE', () => {
      const myInput = ['DELETE', '1stlevel_1/2ndlevel_0'];
      input(myInput, struct);
      const result = struct.getInner().find((x) => x.getName() === '1stlevel_1');
      expect(result.getInner().length).to.equal(0);
    });
    it('test methods invalid MUTATE DELETE', () => {
      const myInput = ['DELETE', '1stlevel_3/2ndlevel_0'];
      expect(mutate(struct, myInput)).equals(`Cannot delete ${myInput[1]} - 2ndlevel_0 does not exist`);
    });
    it('test methods invalid MUTATE CREATE', () => {
      const myInput = ['CREATE', '1stlevel_3/2ndlevel_1'];
      expect(mutate(struct, myInput)).equals('folder not found: 2ndlevel_1');
    });
    it('test methods MUTATE MOVE', () => {
      // mutate(struct, 'CREATE 1stlevel_1/2ndlevel_1');
      const myInput = ['MOVE', '1stlevel_1/2ndlevel_0', '1stlevel_0'];
      input(myInput, struct);
      const result = struct.getInner().find((x) => x.getName() === '1stlevel_1');
      expect(result.getInner().length).to.equal(0);
    });
    it('test methods LIST', () => {
      list(struct, 1);
    });
    it('test methods invalid option', () => {
      // mutate(struct, 'CREATE 1stlevel_1/2ndlevel_1');
      const myInput = ['ALTER', '1stlevel_1/2ndlevel_1'];
      // mutate(myInput, struct);
      expect(() => mutate(struct, myInput)).to.throw('invalid method');
    });
    it('remove a invalid child', () => {
      assert.equal(struct.removeChild(2), false);
    });
    it('remove a valid child', () => {
      assert.equal(struct.removeChild(1), true);
    });
    it('validate invalid method', () => {
      assert.equal(validateMethod('JUICE'), false);
    });
    it('validate valid method', () => {
      for (let index = 0; index < methods.length; index += 1) {
        assert.equal(validateMethod(methods[index]), true);
      }
    });
    it('test index', () => {
      for (let index = 0; index < methods.length; index += 1) {
        assert.equal(validateMethod(methods[index]), true);
      }
    });
    /* it("Check the returned value using: assert.lengthOf(value,'value'): ", function () {
      const result = calculator.addTested('text')
      assert.lengthOf(result, 11)
    }) */
  });
});
