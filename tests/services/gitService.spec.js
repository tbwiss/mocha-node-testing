const chai = require('chai'),
      sinon = require('sinon'),
      https = require('https');
const PassThrough = require('stream').PassThrough;
const gitService = require('../../services/gitService')();
const { getSingleUserGitResponse } = require('../config/gitResponses');

chai.should();

const gitObject = getSingleUserGitResponse();

describe('GitService', () => {
  describe('GetUser', () => {
    beforeEach(function() {
      this.request = sinon.stub(https, 'request');
    });

    it('should return users and repos', function() {
      // const gitObject = { login: 'jonathanfmills', repos: [] };
      const gitResponse = new PassThrough();
      gitResponse.write(JSON.stringify(gitObject));
      gitResponse.end();

      this.request.callsArgWith(1, gitResponse).returns(new PassThrough());

      return gitService.getUser('jonathanfmills').then(user => {
        user.login.should.equal('jonathanfmills');
        // user.should.have.property('repos');
      })
    });

    afterEach(function() {
      this.request.restore();
    });
  });
});