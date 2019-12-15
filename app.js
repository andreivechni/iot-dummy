const Koa = require('koa');
const route = require('koa-route');
var bodyParser = require('koa-bodyparser');
const app = new Koa();
app.use(bodyParser());

const main = ctx => {
    
    console.log(ctx.request.body);
    ctx.response.type = 'json';
    ctx.response.body = { code: 200, recieved: ctx.request.body};

};

app.use(route.get('/', main));
app.use(route.post('/', main));

app.listen(3000);

