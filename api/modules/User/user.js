/**
 * Created by manoj on 11/20/16.
 */
var jwt = require('jwt-simple'),
    crypto = require('crypto');
var user = {
    findUser: function (username, password, res) {
        User.find({username: username}, function (err, dbUserObj) {
            if (err) throw err;
            if (!dbUserObj[0]) { // If authentication fails, we send a 401 back
                res.status(401);
                res.json({
                    "status": 401,
                    "message": "User Not Found"
                });
                return;
            }
            else {
                var encriptpassword = hashPassword(password, dbUserObj[0].salt);
                User.find({username: username, password: encriptpassword}, function (err, loginuser) {
                    if (!loginuser[0]) {
                        // If authentication fails, we send a 401 back
                        res.status(401);
                        res.json({
                            "status": 401,
                            "message": "Password Incorrect"
                        });
                        return;
                    }
                    else {
                        // If authentication is success, we will generate a token
                        // and dispatch it to the client
                        res.status(200);
                        res.json(genToken(loginuser[0]));
                        return;
                    }
                });
            }
        });
    },
    hashPassword: function (password, salt) {
        if (salt && password) {
            return crypto.pbkdf2Sync(password, new Buffer(salt, 'base64'), 10000, 64, 'SHA1').toString('base64');
        } else {
            return password;
        }
    },
    genToken: function (user) {
        var expires = expiresIn(require('../../config/config').tokenexpires); // in seconds.
        var token = jwt.encode({
            exp: expires, user: user
        }, require('../../config/secret')());
        user.salt = '';
        user.password = '';
        return {
            token: token,
            expires: expires,
            user: user
        };
    },
    expiresIn: function (numOfSecond) {
        var dateObj = new Date();
        return dateObj.setSeconds(dateObj.getSeconds() + numOfSecond);
    }
}
module.exports = user;