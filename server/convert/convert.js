module.exports = (srcFilename) => {
    const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path,
        ffmpeg = require('fluent-ffmpeg'),
        mime = require('mime'),
        randomstring = require('randomstring'),
        fs = require('fs'),
        destFilename = 'uploads/' + randomstring.generate() + '.wav';

    ffmpeg.setFfmpegPath(ffmpegPath);

    function convert(filePathIn, filePathOut) { return new Promise((resolve, reject) => {
        if (!filePathIn || !filePathOut) {
            throw new Error('You must specify a path for both input and output files.');
        }
        if (!fs.existsSync(filePathIn)) {
            throw new Error('Input file must exist.');
        }
        if (mime.lookup(filePathIn).indexOf('audio') > -1) {
            try {
                ffmpeg()
                    .input(filePathIn)
                    .outputOptions([
                        '-f s16le',
                        '-acodec pcm_s16le',
                        '-vn',
                        '-ac 1',
                        '-ar 16k',
                        '-map_metadata -1'
                    ])
                    .save(filePathOut)
                    .on('end', () => resolve(filePathOut));

            } catch (e) {
                reject(e);
            }
        } else {
            throw new Error('File must have audio mime.');
        }

    })};

    return convert(srcFilename, destFilename);
};
