function AuthController() {

  let roles;

  function setRoles(role) {
    roles = role;
  }

  function isAuthorized(neededRoles) {
    return roles.indexOf(neededRoles) >= 0;
  }

  function isAuthorizedAsync(neededRoles, cb) {
    setTimeout(() => {
      cb(roles.indexOf(neededRoles) >= 0);
    }, 400);
  }

  function isAuthorizedPromise(neededRoles) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(roles.indexOf(neededRoles) >= 0);
      }, 500);
    }); 
  }

  function getIndex(req, res) {
    res.render('index');
  }

  return {
    isAuthorized,
    isAuthorizedAsync,
    isAuthorizedPromise,
    setRoles,
    getIndex
  };
}

module.exports = AuthController();