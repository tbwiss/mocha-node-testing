const chai = require('chai'),
      sinon = require('sinon'),
      https = require('https');
const PassThrough = require('stream').PassThrough;
const gitService = require('../../services/gitService')();
const {
  getSingleUserGitResponse,
  getAUsersRepos
} = require('../config/gitResponses');

chai.should();

const gitUserObject = getSingleUserGitResponse();
const gitRepos = getAUsersRepos();

describe('GitService', () => {
  describe('GetUser', () => {
    beforeEach(function() {
      this.request = sinon.stub(https, 'request');
    });

    it('should return users and repos', function(done) {
      this.timeout(10000);
      // const gitUserObject = { login: 'jonathanfmills', repos: [] };
      const gitResponse = new PassThrough();
      gitResponse.write(JSON.stringify(gitUserObject));
      gitResponse.end();

      const repoResponse = new PassThrough();
      repoResponse.write(JSON.stringify(gitRepos));
      repoResponse.end();

      this.request.callsArgWith(1, gitResponse).returns(new PassThrough());

      return gitService.getUser('jonathanfmills').then(user => {
        const params = this.request.getCall(0).args;
        params[0].headers['User-Agent'].should.equal('gitExample');
        params[0].path.should.equal('/users/jonathanfmills');

        user.login.should.equal('jonathanfmills');
        user.should.not.have.property('repos');
        done();
      });
    });

    afterEach(function() {
      this.request.restore();
    });
  });
});