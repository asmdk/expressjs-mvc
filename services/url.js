let routes = require('./../routes')();

function getUrlWithoutParams(url) {
    let result = url;
    if (url.indexOf(':') > 0) {
        result = url.slice(0, url.indexOf(':')).replace(/\/+$/, '');
    }
    return result; 
}

module.exports.getUrlWithoutParams = getUrlWithoutParams;

module.exports.getUrlByRoute = function(routeName, params = {}) {
    let url = false;
    for ( let i = 0; i < routes.length; i++ ) {
        let path = routes[i];
        //finding the route in route list
        if ( path.name === routeName ) {
            url = '';
            let routeParamsCount = (path.pattern.match(/\:/g) || []).length;
            //setting up url without params
            if (params === false) {
                url = getUrlWithoutParams(path.pattern);
            }
            //checking the matching of count passed params and route params
            else if (routeParamsCount !== Object.keys(params).length) {
                console.error('Wrong count of params for route: ' + routeName);
                break;
            }
            if (Object.keys(params).length) {
                let pattern = path.pattern;
                url = getUrlWithoutParams(path.pattern, params);
                for(let key in params) {
                    if (params[key] && params[key] !== undefined) {
                        url += '/' + params[key];
                    }
                }
            } else if (path.pattern.indexOf(':') === -1) {
                url = path.pattern;
            } else {
                console.error('The wrong route params for name: ' + routeName);
            }
            break;
        }
    }

    if (url === false) {
        console.error('Unrecognized route for name: ' + routeName);
    }

    return url;
};