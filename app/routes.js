import Router from 'koa-router';

const router = new Router();

router.get('/hello', async (ctx, next) => {
    ctx.body = "hello";
});

export default router;
