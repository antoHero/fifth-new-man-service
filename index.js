import express from 'express';
import './server/db/conn.js';

const app = express();
const port = 3000 || 6000;

app.listen(port, () => {
    console.log(`listening on ${port}`);
});