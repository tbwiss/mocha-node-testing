const should = require('chai').should();

describe('Basic mocha test', () => {
  it('should deal with objects', () => {
    const obj = {
      name: 'Harry',
      gender: 'male'
    };
    const obj2 = {
      name: 'Harry',
      gender: 'male'
    };
    
    obj.should.have.property('name').equal('Harry');
    obj.should.deep.equal(obj2);
  })

  it('should allow testing nulls', () => {
    const iAmNull = null;
    should.not.exist(iAmNull);
  });
});