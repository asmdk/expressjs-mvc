const articlesModel = require('./../models/articles');
const slugify = require('./../services/slugify');

module.exports.view = function(req, res, next) {
    res.render('inner', {
        page_title: 'Все статьи'
    });
};

module.exports.item = function(req, res, next) {
    res.set('Response-Type', 'feed');
    let slug = req.params.slug;
    articlesModel.findOne({slug: slug}).exec().then((article) => {
        if (article && article !== 'null') {
            res.render('articles/item',{
                article: article
            });
        } else {
            next();
        }
    }).catch(next);
};

module.exports.last = function(req, res, next) {
    res.set('Response-Type', 'feed');
    articlesModel.find().limit(6).sort({created: -1}).exec().then((articles) => {
        if (articles && articles !== 'null') {
            res.render('articles/last',{
                page_title: 'Последние статьи',
                not_found: 'Статьи не найдены!',
                moreLink: 'все статьи',
                articles: articles
            });
        } else {
            next();
        }
    }).catch(next);
};

module.exports.list = function(req, res, next) {
    let page = (req.params.page) || 1;
    page = (page >= 1) ? page : 1;

    let query = {};
    let options = {
        sort: { created: -1 },
        page: page,
        limit: 5
    };

    articlesModel.paginate(query, options).then(function(result) {
        res.render('articles/list',{
            page_title: 'Все статьи',
            not_found: 'Статьи не найдены!',
            result: result,
            articlesUrl: req.originalUrl
        });
    });
};