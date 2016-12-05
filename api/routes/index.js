/**
 * Created by manoj on 11/13/16.
 */
var express = require('express');
var router = express.Router();

var movie = require('./../modules/Movie/movie.js');
//var userModule = require('./../modules/User/index');
//router.use('/', userModule);
/*
 * Routes that can be accessed only by autheticated users
 */
var auth = require('./../modules/User/auth');
var utlUpload = require('./../utilities/fileuploads');
router.post('/upload', utlUpload.upload); // done

router.post('/login', auth.login); // done
router.post('/signup', auth.signup); // done

router.get('/api/v1/movies', movie.getAll);
router.get('/api/v1/movie:id?', movie.getOne);
router.post('/api/v1/movie', movie.create);
router.put('/api/v1/movie:id?', movie.update);
router.delete('/api/v1/movie:id?', movie.delete);
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