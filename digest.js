var crypto = require('crypto');

module.exports = function(string) {
    var shasum = crypto.createHash('sha1');
    shasum.update(string);
    return shasum.digest('hex');
};
