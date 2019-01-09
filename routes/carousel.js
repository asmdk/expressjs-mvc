var controller = require('./../controllers/main');

module.exports = function() {
    let routes = [];

    routes.push(
        {
            name: 'frontpage.carousel',
            pattern: '/feed/carousel',
            action: controller.carousel
        }
    );

    return routes;
};
