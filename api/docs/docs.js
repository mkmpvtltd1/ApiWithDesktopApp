/**
 * Created by manoj on 11/17/16.
 */

var path = require('path');
var docs = {
    main: function (req, res) {
        res.sendFile(path.join(__dirname +'/html'+'/index.html'));
    }
};
module.exports = docs;