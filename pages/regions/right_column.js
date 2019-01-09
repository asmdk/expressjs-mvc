const urlService = require('./../../services/url');

module.exports = [
    {
        blockName: 'gossl',
        feedUrl: urlService.getUrlByRoute('block.gossl'),
        container: 'sidebar_right'
    },
];