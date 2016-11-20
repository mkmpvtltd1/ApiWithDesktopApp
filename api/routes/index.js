/**
 * Created by manoj on 11/13/16.
 */
var express = require('express');
var router = express.Router();

var auth = require('./../modules/User/auth.js');
var movie = require('./../modules/Movie/movie.js');
//var user = require('./users.js');

/*
 * Routes that can be accessed by any one
 */
router.post('/login', auth.login); // done
router.post('/signup', auth.signup); // done

/*
 * Routes that can be accessed only by autheticated users
 */
router.get('/api/v1/movies', movie.getAll);
router.post('/api/v1/movie', movie.create);
router.get('/api/v1/movie:id?', movie.getOne);
//router.get('/api/v1/movie/:id', products.getOne);
//router.delete('/api/v1/movie/:id', products.delete);

/*
 * Routes that can be accessed only by authenticated & authorized users

router.get('/api/v1/admin/users', user.getAll);
router.get('/api/v1/admin/user/:id', user.getOne);
router.post('/api/v1/admin/user/', user.create);
router.put('/api/v1/admin/user/:id', user.update);
router.delete('/api/v1/admin/user/:id', user.delete);
*/
module.exports = router;