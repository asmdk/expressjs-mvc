module.exports.index = function(req, res, next) {
    res.render('index');
};

module.exports.contacts = function(req, res, next) {
    res.render('main/contacts', {
        page_title: 'Контакты'
    });
};

module.exports.feedback = function(req, res, next) {
    res.render('main/feedback', {
        page_title: 'Обратная связь'
    });
};

module.exports.faq = function(req, res, next) {
    res.render('main/faq', {
        page_title: 'Вопрос-ответ'
    });
};

module.exports.carousel = function(req, res, next) {
    res.set('Response-Type', 'feed');
    res.render('main/carousel');
};

module.exports.gossl = function(req, res, next) {
    res.set('Response-Type', 'feed');
    res.render('main/gossl');
};