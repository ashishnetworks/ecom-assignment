var crypto = require('crypto');
var md5sum = crypto.createHash('md5');

function getMd5Hash(string) {
    return crypto.createHash('md5').update(string).digest('hex')
}

module.exports = getMd5Hash
