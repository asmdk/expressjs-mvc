const controller = require('./../controllers/menu');

module.exports = function() {
    let routes = [];

    routes.push(
        {
            name: 'menu',
            pattern: '/menu/:menu_id',
            action: controller.getMenu
        }
    );

    return routes;
};
