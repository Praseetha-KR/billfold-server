import Router from 'koa-router';
import Expense from './controllers.js';

const expenseRouter = new Router();
expenseRouter
    .get('/', async (ctx, next) => {
        ctx.body = "expenses";
    })
    // .post('/', async (ctx, next) => {
    //     ctx.body = ctx.request.body;
    // })
    .get('/:id', async (ctx, next) => {
        ctx.body = await Expense.get(ctx.params.id);
    })
    .put('/:id', async (ctx, next) => {
        ctx.body = await Expense.edit(
            ctx.params.id,
            ctx.request.body.value,
            ctx.request.body.category,
            ctx.request.body.remarks
        );
    });
    // .del('/:id', async (ctx, next) => {
    //     ctx.body = ctx.params.id;
    // });

export default expenseRouter;
