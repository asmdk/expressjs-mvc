window.renderBlocks = function(blocks) {

    (function($, blocks) {
        $(document).ready(function() {
            blocks.forEach(function(item) {
                if (item.feedUrl) {
                    $.ajax({
                        method: 'GET',
                        url: item.feedUrl
                    })
                    .done(function( data, textStatus, request ) {
                        //check the header to prevent an appending wrong template
                        let responseType = request.getResponseHeader('response-type');
                        if (responseType && responseType === 'feed') {
                            $('#'+item.container).append(data);
                        } else {
                            console.error('Set the request type header as "feed"!');
                        }
                    });
                }
            });

        });
    }(jQuery, blocks));

};