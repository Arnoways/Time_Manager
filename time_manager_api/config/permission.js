var jwt = require('jsonwebtoken');

module.exports = {
  roleCheck : function permit(...allowed) {
    const isAllowed = role => allowed.indexOf(role) > -1;
    
    // return a middleware
    return (request, response, next) => {
      var bearerToken = request.headers['authorization'].split(' ');
      var decodedToken = jwt.decode(bearerToken[1]);
      if (decodedToken.role && isAllowed(decodedToken.role))
        next(); // role is allowed, so continue on the next middleware
      else {
        response.status(403).json({message: "Forbidden"}); // user is forbidden
      }
    }
  }
}