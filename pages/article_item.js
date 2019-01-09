const urlService = require('./../services/url');

module.exports = function(params) {
    return [
        {
            blockName: 'itemArticle',
            feedUrl: urlService.getUrlByRoute('article.item', params),
            container: 'sidebar_left'
        }
    ].concat(require('./regions/right_column'));
};