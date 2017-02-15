import Router from 'koa-router';
import expenseRouter from './expenses.js';

const router = new Router();
router
    .get('/', async (ctx, next) => {
        ctx.body = "Welcome to expenses API";
    })
    .use('/api/v1/expenses', expenseRouter.routes());

export default router;
