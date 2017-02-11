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

const router = new Router();
router
    .get('/', async (ctx, next) => {
        ctx.body = "Welcome to expenses API";
    })
    .use('/api/v1/expenses', expenseRouter.routes());

export default router;
