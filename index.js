import express from 'express';
import bodyParser from 'body-parser';
import './server/db/conn.js';
import categoryRoutes from './server/routes/categoryRoutes.js';
import departmentRoutes from './server/routes/departmentRoutes.js'

const app = express();
const port = 8082 || 3000;
const jsonParser = bodyParser.json();

app.use('/categories', jsonParser, categoryRoutes);
app.use('/departments', jsonParser, departmentRoutes);
app.listen(port, () => {
    console.log(`listening on ${port}`);
});