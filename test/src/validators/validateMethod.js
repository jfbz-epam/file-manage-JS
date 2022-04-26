const { assert } = require('chai');
const methods = require('../../../src/consts/methods');
const { validateMethod } = require('../../../src/validators');

describe('validateMethod check', () => {
  it('validate invalid method', () => {
    assert.equal(validateMethod('JUICE'), false);
  });
  it('validate valid method', () => {
    for (let index = 0; index < methods.length; index += 1) {
      assert.equal(validateMethod(methods[index]), true);
    }
  });
  it('call function with empty params', () => {
    assert.equal(validateMethod(), false);
  });
  it('more params than expected', () => {
    assert.equal(validateMethod('aa', 'bb'), false);
  });
});
