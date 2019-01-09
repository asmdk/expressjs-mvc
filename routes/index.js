module.exports = function() {
  let normalizedPath = require("path").join(__dirname);
  let routeList = [];
  require("fs").readdirSync(normalizedPath).forEach(function(file) {
    if (file !== 'index.js') {
        let routes = require('./' + file)();
        for ( let i = 0; i < routes.length; i++ ) {
            routeList.push(routes[i]);
        }
    }
  });
  return routeList;
};