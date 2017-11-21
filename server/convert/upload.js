/**
 * Загрузка файлов в google storage
 *
 * @param {String} bucketName имя папки для загрузки
 * @param {String} srcFilename имя загружаемого файла
 *
 * @returns {Promise} Загрузка файла
 */
module.exports = (bucketName, srcFilename) => {
    // Imports the Google Cloud client library
   const Storage = require('@google-cloud/storage'),
        storage = new Storage(),
        baseName = srcFilename.replace(/\\/g, '/').split('/').pop();

   return storage
       .bucket(bucketName)
       .upload(srcFilename)
       .catch(err => {
           console.error('ERROR:', err);
       })
       .then(() => {
           return `gs://${bucketName}/${baseName}`;
       });
};
