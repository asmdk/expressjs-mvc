const menuModel = require("./../models/menu");

module.exports.getMenu = function(req, res, next) {
    menuModel.byId('main-menu', function(err, docs) {
        if (docs && docs !== 'null') {
            res.end(JSON.stringify(docs));
        } else {
            next();
        }
    });
};