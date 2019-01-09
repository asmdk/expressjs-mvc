const urlService = require('./../services/url');

module.exports = function(params) {
    return [
        {
            blockName: 'listNews',
            feedUrl: urlService.getUrlByRoute('news.list', params),
            container: 'sidebar_left'
        }
    ].concat(require('./regions/right_column'));
};