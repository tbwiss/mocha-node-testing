const assert = require('assert');
const authController = require('../../controllers/auth.controller');
const expect = require('chai').expect;
require('chai').should();
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');

chai.use(chaiAsPromised);
chai.should();

describe('AuthController', () => {
  describe('isAuthorized', () => {
    let user = {};
    beforeEach(() => {
      user = {
        roles: ['user'],
        isAuthorized: function (neededRole) {
          return this.roles.indexOf(neededRole) >= 0;
        }
      }
      sinon.spy(user, 'isAuthorized');
      authController.setUser(user);
    });

    it('should return false if not authorized', () => {
      const isAuth = authController.isAuthorized('admin');
      user.isAuthorized.calledOnce.should.be.true;
      expect(isAuth).to.be.false;
    });

    it('should return true if not authorized', () => {
      authController.setRoles(['user', 'admin']);
      const isAuth = authController.isAuthorized('admin');
      isAuth.should.be.true;
    });

    it('should not allow a get if not authorized');
    it('should allow get if authorized');
  });

  describe('isAuthorizedAsync', () => {
    beforeEach(function settingUpRoles() {
      authController.setRoles(['user']);
    });

    it('should return false if not authorized', done => {
      authController.isAuthorizedAsync('admin', (isAuth) => {
        assert.equal(false, isAuth);
        done();
      });
    });
  });

  describe('isAuthorizedPromise', () => {
    beforeEach(function settingUpRoles() {
      authController.setRoles(['user']);
    });

    it('should return false if not authorized', () => {
      return authController.isAuthorizedPromise('admin').should.eventually.be.false;
    });
  });

  describe('getIndex', () => {
    let user = {};
    beforeEach(() => {
      user = {
        roles: ['user'],
        isAuthorized: function (neededRole) {
          return this.roles.indexOf(neededRole) >= 0;
        }
      }
    });

    it('should render index if authorized', () => {
      const isAuth = sinon.stub(user, 'isAuthorized').returns(true);
      const req = { user };
      const res = {
        render: () => {}
      };

      const mock = sinon.mock(res);
      mock.expects('render').once().withExactArgs('index')

      authController.getIndex(req, res);
      isAuth.calledOnce.should.be.true;

      mock.verify();
    });

    it('should render notAuth if unauthorized', () => {
      const isAuth = sinon.stub(user, 'isAuthorized').returns(false);
      const req = { user };
      const res = {
        render: sinon.spy()
      };

      authController.getIndex(req, res);
      isAuth.calledOnce.should.be.true;
      res.render.calledOnce.should.be.true;
      res.render.firstCall.args[0].should.equal('notAuth');
    });

    it('should render error when throwing an error', () => {
      const isAuth = sinon.stub(user, 'isAuthorized').throws();
      const req = { user };
      const res = {
        render: sinon.spy()
      };

      authController.getIndex(req, res);
      isAuth.calledOnce.should.be.true;
      res.render.calledOnce.should.be.true;
      res.render.firstCall.args[0].should.equal('error');
    });
  });
});