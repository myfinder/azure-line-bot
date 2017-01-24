
var https = require("https");
var url   = require("url");

function post_line(event)
{
    var post_data = JSON.stringify({
        "replyToken" : event.replyToken,
        "messages"   : [ event.message ]
    });
    var parse_url = url.parse("https://api.line.me/v2/bot/message/reply");
    var post_options = {
        host: parse_url.host,
        path: parse_url.path,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer {' + process.env.LINE_CHANNEL_ACCESS_TOKEN + '}',
            'Content-Length': Buffer.byteLength(post_data)
        }
    };
    var post_req = https.request(post_options);
    post_req.write(post_data);
    post_req.end();
}

module.exports = function (context, myQueueItem) {
    context.log('Node.js queue trigger function processed work item', myQueueItem);
    myQueueItem.events.forEach(event => post_line(event));
    context.done();
};
