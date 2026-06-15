function isAdmin(req, res, next) {

      console.log(req.user);
      
     if (!req.user) {
        return res.status(401).jsend.fail({
            statusCode: 401,
            result: "fail",
            message: 'No user information found',
        });
    }

    if (Number(req.user.roleId) !== 1){
        return res.status(403).jsend.fail({
            statusCode: 403,
            result: "fail",
            message: 'Access denied: Admins only',
        });
    }

   
    next();
}

module.exports = isAdmin;