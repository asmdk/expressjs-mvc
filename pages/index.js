module.exports = function(page, params) {
    let fs = require('fs'),
        filename =  require("path").join(__dirname) + '/' + page,
        blocks = []
    ;

    if (fs.existsSync(filename + '.js')) {
        let data = require(filename)(params);
        blocks = {
            value: data,
            json: JSON.stringify(data)
        }
    }

    return blocks;
};