/**
 * Created by manoj on 11/15/16.
 */

var Movie = require('./models/movie');
var movies = {
    create: function (req, res) {
        var newMovie = new Movie(req.body);
        newMovie.save(function (err, newmovie) {
            if (err) {
                res.json(err);
                return;
            }
            else {
                res.status(200);
                res.json(newmovie);
                return;
            }
        });
    },
    getAll: function (req, res) {
        Movie.find({}, function (err, Movies) {
            if (err) throw err;
            else {
                res.status(200);
                res.json(Movies);
            }
        }); // Spoof a DB call
    },
    getOne: function (req, res) {
        var id = req.query.id;
        Movie.find({_id: id}, function (err, findMovies) {
            if (!findMovies[0]) {
                res.status(401);
                res.json({
                    "status": 401,
                    "message": "Movie not found"
                });
                return;
            }
            else {
                res.status(200);
                res.json(findMovies[0]);
                return;
            }
        });
    },
    update: function (req, res, next) {
        // var updatemovie = new Movie(req.body);
        var id = req.query.id;
        Movie.find({_id: id}, function (error, movie) {
            if (error) return next(error);
            if (!movie) {
                return res.status(404).json({
                    message: 'Movie with id ' + id + ' can not be found.'
                });
            }
            movie.update(req.body, function (error, movie) {
                if (error) return next(error);
                res.json(movie);
            });
        });
    },

    delete: function (req, res, next) {
        var id = req.query.id;
        Movie.remove({_id: id}, function (err, result) {
            if (err) return next(err);
            res.json(result);
        });
    }
};

module.exports = movies;