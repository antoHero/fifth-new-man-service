import express from 'express';
import bodyParser from 'body-parser';
import './server/db/conn.js';
import categoryRoute from './server/routes/categoryRoutes.js';

const app = express();
const port = 8082 || 3000;
const jsonParser = bodyParser.json();
app.use('/categories', jsonParser, categoryRoute);
app.listen(port, () => {
    console.log(`listening on ${port}`);
});