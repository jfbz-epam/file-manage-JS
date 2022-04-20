
const assert = require('chai').assert
const calculator = require('../../../src/testUnit/calculator')

describe('Calcultator tests using ASSERT interface from CHAI module: ', function () {
  describe('Check addTested Function: ', function () {
    it("Check the returned value using: assert.equal(value,'value'): ", function () {
      const result = calculator.addTested('text')
      assert.equal(result, 'text tested')
    })
    it("Check the returned value using: assert.typeOf(value,'value'): ", function () {
      const result = calculator.addTested('text')
      assert.typeOf(result, 'string')
    })
    it("Check the returned value using: assert.lengthOf(value,'value'): ", function () {
      const result = calculator.addTested('text')
      assert.lengthOf(result, 11)
    })
  })
})
