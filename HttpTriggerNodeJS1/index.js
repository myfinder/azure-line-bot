module.exports = function(context, req) {
    context.log('Node.js HTTP trigger function processed a request. RequestUri=%s', req.originalUrl);

    context.bindings.outputQueueItem = req.body;
    
    context.res = { body : "" };
    context.done();
};
