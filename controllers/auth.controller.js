function AuthController() {

  let roles;
  let user;

  function setRoles(role) {
    roles = role;
    user.roles = role;
  }

  function setUser(inUser) {
    user = inUser;
  }

  function isAuthorized(neededRole) {
    if (user) {
      return user.isAuthorized(neededRole)
    }
  }

  function isAuthorizedAsync(neededRole, cb) {
    setTimeout(() => {
      cb(roles.indexOf(neededRole) >= 0);
    }, 400);
  }

  function isAuthorizedPromise(neededRole) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(roles.indexOf(neededRole) >= 0);
      }, 500);
    }); 
  }

  function getIndex(req, res) {
    try {
      if (req.user.isAuthorized('admin')) {
        return res.render('index');
      }
      res.render('notAuth');
    } catch (error) {
      res.render('error');
    }
  }

  return {
    isAuthorized,
    isAuthorizedAsync,
    isAuthorizedPromise,
    setRoles,
    setUser,
    getIndex
  };
}

module.exports = AuthController();