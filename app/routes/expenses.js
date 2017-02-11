import Router from 'koa-router';

const expenseRouter = new Router();
expenseRouter
    .get('/', async (ctx, next) => {
        ctx.body = "expenses";
    })
    .post('/', async (ctx, next) => {
        ctx.body = ctx.request.body;
    })
    .get('/:id', async (ctx, next) => {
        ctx.body = ctx.params.id;
    })
    .put('/:id', async (ctx, next) => {
        ctx.body = ctx.params.id;
    })
    .del('/:id', async (ctx, next) => {
        ctx.body = ctx.params.id;
    });

export default expenseRouter;
