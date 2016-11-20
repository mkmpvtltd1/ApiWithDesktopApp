/**
 * Created by manoj on 11/15/16.
 */
/**
 * Module dependencies
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var movieSchema = new Schema({
    name: {type: String, required: true},
    tag: [{type: String}],
    description: String,
    director: String,
    cast: [{type: String}],
    releaseDate: Date,
    isActive:Boolean,
    duration:Number,
    Language:[{type: String}],
    photo: [{type: String}],
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: Date
});
// the schema is useless so far
// we need to create a model using it
var Movie = mongoose.model('Movie', movieSchema);

// make this available to our users in our Node applications
module.exports = Movie;