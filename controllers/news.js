const newsModel = require('./../models/news');

module.exports.view = function(req, res, next) {
    let slug = req.params.slug;
    res.render('inner', {
        page_title: 'Все новости'
    });
};

module.exports.page = function(req, res, next) {
    res.render('inner', {
        page_title: 'Все новости'
    });
};

module.exports.item = function(req, res, next) {
    res.set('Response-Type', 'feed');
    let slug = req.params.slug;
    newsModel.findOne({slug: slug}).exec().then((news) => {
        if (news && news !== 'null') {
            res.render('news/item',{
                news: news
            });
        } else {
            next();
        }
    }).catch(next);
};

module.exports.last = function(req, res, next) {
    res.set('Response-Type', 'feed');
    newsModel.find().limit(3).sort({created: -1}).exec().then((news) => {
        if (news && news !== 'null') {
            res.render('news/last',{
                page_title: 'Новости',
                not_found: 'Новости не найдены!',
                news: news
            });
        } else {
            next();
        }
    }).catch(next);
};

module.exports.list = function(req, res, next) {
    res.set('Response-Type', 'feed');
    let page = (req.params.page) || 1;
    page = (page >= 1) ? page : 1;

    let query = {};
    let options = {
        sort: { created: -1 },
        page: page,
        limit: 5
    };

    newsModel.paginate(query, options).then(function(result) {
        res.render('news/list',{
            not_found: 'Новости не найдены!',
            result: result
        });
    });
};