import express from 'express';
import 'express-async-errors';

import errorHandler from './middlewares/errorHandler';
import uploadConfig from './config/upload';

import routes from './routes';
import './database';

const app = express();
app.use(express.json());

app.use('/files', express.static(uploadConfig.directory));
app.use(routes);
app.use(errorHandler);

app.listen(process.env.PORT || 3000);
