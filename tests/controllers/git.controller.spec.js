const rewire = require('rewire');
const GitCtrl = rewire('../../controllers/gitController');
const gitController = GitCtrl();
const chai = require('chai');
const sinon = require('sinon');

chai.should();
let getUserGlobal = null;

describe('gitController', () => {
  beforeEach(function () {
    const gitService = GitCtrl.__get__('gitService');
    getUserGlobal = sinon.spy(gitService, 'getUser');
    GitCtrl.__set__('gitService', gitService);
  });

  it('should get user and repos from git service', function(done) {
    this.timeout(10000);
    
    const req = {
      params: { 
        userId: 'jonathanfmills' 
      }
    };
    const res = {
      json: (user) => {
        getUserGlobal.getCall(0).args[0].should.equal('jonathanfmills');
        getUserGlobal.calledOnce.should.be.true;
        user.login.should.equal('jonathanfmills');
        done();
      }
    };

    gitController.userGet(req, res);
  });
})
