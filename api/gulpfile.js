/**
 * Created by manoj on 11/13/16.
 */
var gulp = require('gulp'),
    nodemon = require('gulp-nodemon');
//node --inspect server.js 
gulp.task('default', function() {
    nodemon({
        script: 'server.js'
        , ext: 'js html'
        , env: { 'NODE_ENV': 'development' }
    })
});