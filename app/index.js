import Koa from 'koa';
import logger from 'koa-logger';
import router from './routes';
import bodyParser from 'koa-bodyparser';

const app = new Koa();
app
    .use(logger())
    .use(bodyParser())
    .use(router.routes());

export default app;
