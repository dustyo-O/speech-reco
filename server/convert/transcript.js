module.exports = (gcsUri, res) => {
    const speech = require('@google-cloud/speech'),
        client = new speech.SpeechClient();

    const config = {
        encoding: 'LINEAR16',
        sampleRateHertz: 16000,
        languageCode: 'ru-RU',
    };

    const audio = {
        uri: gcsUri,
    };

    const request = {
        config: config,
        audio: audio,
    };

    // Detects speech in the audio file. This creates a recognition job that you
    // can wait for now, or get its result later.
    client
        .longRunningRecognize(request)
        .then(data => {
            const operation = data[0];
            // Get a Promise representation of the final result of the job
            return operation.promise();
        })
        .then(data => {
            const response = data[0];
            const transcription = response.results
                .map(result => result.alternatives[0].transcript)
                .join('\n');
            res.send(`Transcription: ${transcription}`);
        })
        .catch(err => {
            console.error('ERROR:', err);
        });
};
