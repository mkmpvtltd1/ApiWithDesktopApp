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
                // If authentication fails, we send a 401 back
                res.status(401);
                res.json({
                    "status": 401,
                    "message": "Movie not found"
                });
                return;
            }
            else {
                // If authentication is success, we will generate a token
                // and dispatch it to the client
                res.status(200);
                res.json(findMovies[0]);
                return;
            }
        });
    },
};

module.exports = movies;