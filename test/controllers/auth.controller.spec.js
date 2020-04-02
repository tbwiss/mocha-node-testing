const assert = require('assert');
const authController = require('../../controllers/auth.controller');
const expect = require('chai').expect;
require('chai').should();
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
chai.should();

describe('AuthController', () => {
  beforeEach('setter hook', () => {
    authController.setRoles(['users']);
  });

  describe('isAuthorized', () => {
    it('should return false if not authorized', () => {
      const isAuth = authController.isAuthorized('admin');
      expect(isAuth).to.be.false;
    });

    it('should return true if not authorized', () => {
      authController.setRoles(['users', 'admin']);
      const isAuth = authController.isAuthorized('admin');
      isAuth.should.be.true;
    });

    it('should not allow a get if not authorized');
    it('should allow get if authorized');
  });

  describe('isAuthorizedAsync', () => {
    it('should return false if not authorized', done => {
      authController.isAuthorizedAsync('admin', (isAuth) => {
        assert.equal(false, isAuth);
        done();
      });
    });
  });

  describe('isAuthorizedPromise', () => {
    it('should return false if not authorized', () => {
      return authController.isAuthorizedPromise('admin').should.eventually.be.false;
    });
  });
});