
const expect = require('chai').expect
const calculator = require('../../../src/testUnit/calculator')

describe('Calcultator tests using EXPECT interface from CHAI module: ', function () {
  describe('Check addTested Function: ', function () {
    it("Check the returned value using: expect(value).to.equal('value'): ", function () {
      const result = calculator.addTested('text')
      expect(result).to.equal('text tested')
    })
    it("Check the returned value using: expect(value).to.be.a('value')): ", function () {
      const result = calculator.addTested('text')
      expect(result).to.be.a('string')
    })
    it('Check the returned value using: expect(value).to.have.lengthOf(value): ', function () {
      const result = calculator.addTested('text')
      expect(result).to.have.lengthOf(11)
    })
  })
})
