var controller = require('./../controllers/news');

module.exports = function() {
    let routes = [];

    routes.push(
        {
            name: 'news.page',
            pattern: '/news/:page(\\d+)?',
            action: controller.page,
            page: 'news'
        }
    );
    routes.push(
        {
            name: 'news.view',
            pattern: '/news/:slug([\\w-]+)',
            action: controller.view,
            page: 'news_item'
        }
    );
    routes.push(
        {
            name: 'news.item',
            pattern: '/feed/news/:slug([\\w-]+)',
            action: controller.item
        }
    );
    routes.push(
        {
            name: 'news.list',
            pattern: '/feed/news/:page(\\d+)?',
            action: controller.list
        }
    );
    routes.push(
        {
            name: 'news.last',
            pattern: '/feed/news/last',
            action: controller.last
        }
    );

    return routes;
};
