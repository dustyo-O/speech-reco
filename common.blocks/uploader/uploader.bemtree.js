block('uploader').content()(function() {
    return [{
        tag: 'input',
        attrs: { type: 'hidden', name: '_csrf', value: this.data.csrf }
    }, {
        block: 'attach',
        name: 'attach',
        mods: { theme: 'islands', size: 'm', focused: true },
        button: 'Выберите файл',
        noFileText: 'Файл не выбран'
    }, {
        block: 'button',
        mods: { type: 'submit', theme: 'islands', size: 'm' },
        text: 'Отправить'
    }];
});
