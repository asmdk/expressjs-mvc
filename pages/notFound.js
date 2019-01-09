let blocks = [
    {
        blockName: 'notFound',
        pageName: 'notFound',
        pageUrl: '/notFound',
        container: 'content'
    }
];

module.exports.value = blocks;
module.exports.getJson = function() { JSON.stringify(blocks) };