block('uploader')(
    tag()('form'),
    attrs()(function() {
        return {
            method: 'post',
            enctype: 'multipart/form-data'
        };
    })
);

