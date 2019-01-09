var controller = require('./../controllers/articles');

module.exports = function() {
    let routes = [];

    routes.push(
        {
            name: 'article.list',
            pattern: '/articles/:page(\\d+)?',
            action: controller.list
        }
    );
    routes.push(
        {
            name: 'article.view',
            pattern: '/article/:slug([\\w-]+)',
            action: controller.view,
            page: 'article_item'
        }
    );
    routes.push(
        {
            name: 'article.item',
            pattern: '/feed/article/:slug([\\w-]+)',
            action: controller.item
        }
    );
    routes.push(
        {
            name: 'article.last',
            pattern: '/feed/articles/last',
            action: controller.last
        }
    );

    return routes;
};
