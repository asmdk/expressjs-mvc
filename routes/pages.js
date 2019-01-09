const controller = require('./../controllers/main');

module.exports = function() {
    return [
        {
            name: 'frontpage',
            pattern: '/',
            action: controller.index,
            page: 'homepage'
        },
        {
            name: 'contacts',
            pattern: '/contacts',
            action: controller.contacts
        },
        {
            name: 'feedback',
            pattern: '/feedback',
            action: controller.feedback
        },
        {
            name: 'feedback',
            pattern: '/faq',
            action: controller.faq
        }
    ];
};