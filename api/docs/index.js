/**
 * Created by manoj on 11/17/16.
 */
var express = require('express');
var router = express.Router();



var docs = require('./docs.js');
router.get('/', docs.main);




module.exports = router;