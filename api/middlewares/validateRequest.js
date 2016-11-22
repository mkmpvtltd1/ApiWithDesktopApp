/**
 * http://thejackalofjavascript.com/architecting-a-restful-node-js-app/
 * Created by manoj on 11/13/16.
 */
var jwt = require('jwt-simple');
var fs = require('fs');

module.exports = function (req, res, next) {

    // When performing a cross domain request, you will recieve
    // a preflighted request first. This is to check if our the app
    // is safe.

    // We skip the token outh for [OPTIONS] requests.
    //if(req.method == 'OPTIONS') next();

    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    // var key = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'];

    if (token) {// || key
        try {
            var decoded = jwt.decode(token, require('../config/secret.js')());

            if (decoded.exp <= Date.now()) {
                res.status(400);
                res.json({
                    "status": 400,
                    "message": "Token Expired"
                });
                return;
            }

            // Authorize the user to see if s/he can access our resources

            var user = decoded.user;
            if (user) {
                // TODO : Convert authentication to callback asynchronous method
                //if ((req.url.indexOf('admin') >= 0 && dbUser.role == 'admin') || (req.url.indexOf('admin') < 0 && req.url.indexOf('/api/v1/') >= 0)) {
                if (checkAuthorization(user.role, user.username, req.url.split('?')[0], req.method)) {
                    next(); // To move to next middleware
                } else {
                    res.status(403);
                    res.json({
                        "status": 403,
                        "message": "Not Authorized"
                    });
                    return;
                }
            } else {
                // No user with this name exists, respond back with a 401
                res.status(401);
                res.json({
                    "status": 401,
                    "message": "Invalid User"
                });
                return;
            }

        }
        catch (err) {
            res.status(500);
            res.json({
                "status": 500,
                "message": "Oops something went wrong",
                "error": err
            });
        }
    } else {
        res.status(401);
        res.json({
            "status": 401,
            "message": "Invalid Token"
        });
        return;
    }
};
function checkAuthorization(roles, user, url, method) {
    var obj;
    var isAuthenticated = false;
    try {
        // TODO: File json read and set it to variable by which reading json file every time from file is removed and app become fast.
        // TODO : watch eacl.json file for change and update variable value.
        var data = fs.readFileSync("./middlewares/eacl.json", 'utf8');
        obj = JSON.parse(data);
        var res = findAccess(obj, roles, user, url, method);
        isAuthenticated = res;
    }
    catch (err) {
        isAuthenticated = false;
        throw err;
    } finally {
        return isAuthenticated;
    }
}
function findAccess(obj, roles, user, url, method) {
    var ret = false;
    obj.forEach(function (role) {
        roles.forEach(function (rol) {
            if (rol in role) {
                var urls = index(role, rol);
                if (url in urls) {
                    var met = index(urls, url);
                    if (met.indexOf(method) >= 0) {
                        ret = true;
                        return true;
                    }
                }
            }
        })
    })
    return ret;
}
/*
 * ref: http://stackoverflow.com/a/6394168/1756068
 * */
function index(obj, is, value) {
    if (typeof is == 'string')
        return index(obj, is.split('.'), value);
    else if (is.length == 1 && value !== undefined)
        return obj[is[0]] = value;
    else if (is.length == 0)
        return obj;
    else
        return index(obj[is[0]], is.slice(1), value);
}