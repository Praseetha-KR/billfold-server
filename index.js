import app from './app';
import config from './config.js';

app.listen(config.PORT, console.log(`Listening on port ${ config.PORT }`));
