/**
 * Created by manoj on 11/13/16.
 */

var User = require('./models/user');
var userFun = require('./user')
var auth = {
    login: function (req, res) {

        var username = req.body.username || '';
        var password = req.body.password || '';

        if (username == '' || password == '') {
            res.status(401);
            res.json({
                "status": 401,
                "message": "Invalid credentials"
            });
            return;
        }
        userFun.findUser(username, password, res);
    },
    UpdateUser: function (req, res, next) {
        var id = req.query.id;
        User.find({_id: id}, function (error, user) {
            if (error) return next(error);
            if (!user) {
                return res.status(404).json({
                    message: 'User with id ' + id + ' can not be found.'
                });
            }
            user[0].update(req.body, function (error, user) {
                if (error) return next(error);
                res.json(user);
            });
        });
    },
    signup: function (req, res) {
        var username = req.body.username || '';
        var password = req.body.password || '';
        var name = req.body.name || '';
        var role = req.body.role;
        var meta = req.body.meta;
        if (username == '' || password == '' || name.first == '') {
            res.status(401);
            res.json({
                "status": 401,
                "message": "Invalid credentials"
            });
            return;
        }
        else {
            // create a new user called chris
            var newUser = new User({
                name: name,
                username: username,
                password: password,
                role: role,
                meta: meta
            });

            // call the built-in save method to save to the database
            newUser.save(function (err, newuser) {
                if (err) {
                    res.json(err);
                    return;
                }
                else {
                    userFun.findUser(newuser.username, newuser.password, res);
                    res.status(201);
                }
            });


        }
    }
}
module.exports = auth;