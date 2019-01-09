const urlService = require('./../services/url');

module.exports = function(params) {
    return [
        {
            blockName: 'itemNews',
            feedUrl: urlService.getUrlByRoute('news.item', params),
            container: 'sidebar_left'
        }
    ].concat(require('./regions/right_column'));
};