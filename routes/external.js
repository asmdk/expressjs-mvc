var controller = require('./../controllers/main');

module.exports = function() {
    let routes = [];

    routes.push(
        {
            name: 'block.gossl',
            pattern: '/feed/gossl',
            action: controller.gossl
        }
    );

    return routes;
};
