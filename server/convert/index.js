module.exports = (filename, res) => {
    const config = require('../../config'),
        convert = require('./convert'),
        transcript = require('./transcript'),
        upload = require('./upload');

    return convert(filename)
    .then(convertedFile => upload(config.bucketName, convertedFile))
    .then(gs => transcript(gs, res));
};
