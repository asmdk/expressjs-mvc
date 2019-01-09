const urlService = require('./../services/url');

module.exports = function(params) {
    return [
        {
            blockName: 'Carousel',
            feedUrl: urlService.getUrlByRoute('frontpage.carousel'),
            container: 'sidebar_left'
        },
        {
            blockName: 'lastArticles',
            feedUrl: urlService.getUrlByRoute('article.last'),
            container: 'sidebar_left'
        },
        {
            blockName: 'lastNews',
            feedUrl: urlService.getUrlByRoute('news.last'),
            container: 'content_bottom'
        }
    ].concat(require('./regions/right_column'));
};