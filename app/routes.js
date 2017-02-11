import Router from 'koa-router';

const router = new Router({
    prefix: '/api/v1/'
});

router
    .get('/expenses', async (ctx, next) => {
        ctx.body = "hello";
    })
    .post('/expenses', async (ctx, next) => {
        ctx.body = ctx.request.body;
    })
    .get('/expenses/:id', async (ctx, next) => {
        ctx.body = ctx.params.id;
    })
    .put('/expenses/:id', async (ctx, next) => {
        ctx.body = ctx.params.id;
    })
    .del('/expenses/:id', async (ctx, next) => {
        ctx.body = ctx.params.id;
    });

export default router;
