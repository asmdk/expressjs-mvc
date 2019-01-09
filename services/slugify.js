const translit = require('translitit-cyrillic-russian-to-latin');

module.exports.slugify = function(text) {
    let slug = translit(text.toString()).toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '')
    ;

    return slug;

};