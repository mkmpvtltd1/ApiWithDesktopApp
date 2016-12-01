/*
 * https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
 */

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
    crypto = require('crypto'),
    config = require('../../../config/config');
mongoose.Promise = global.Promise;
mongoose.connect(config.database);
var Schema = mongoose.Schema;


// create a schema
var userSchema = new Schema({
    name: {
        first: {type: String, required: true},
        last: {type: String}
    },
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    salt: String,
    role: [{type: String}],
    Image: String,
    meta: {
        age: Number,
        location: String,
        website: String
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: Date
});
// on every save, add the date
userSchema.pre('save', function (next) {
    // get the current date
    var currentDate = new Date();

    // change the updated_at field to current date
    this.updated_at = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.created_at)
        this.created_at = currentDate;

    if (this.password && this.isModified('password')) {
        this.salt = crypto.randomBytes(16).toString('base64');
        this.password = this.hashPassword(this.password);
    }
    next();
});

/**
 * Create instance method for hashing a password
 */
userSchema.methods.hashPassword = function (password) {
    if (this.salt && password) {
        return crypto.pbkdf2Sync(password, new Buffer(this.salt, 'base64'), 10000, 64, 'SHA1').toString('base64');
    } else {
        return password;
    }
};

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('Users', userSchema);

// make this available to our users in our Node applications
module.exports = User;