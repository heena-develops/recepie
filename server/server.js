import express from 'express';
import bodyParser from 'body-parser';

import recepiesRouts from './routes/recepies.js';

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.use('/recepies', recepiesRouts);

app.get('/', (req, res) =>
res.send('Hello from home page of recepie.'));

app.listen(PORT, () => console.log(`Server Running on port: http://localhost:${PORT}`));
console.log('[TEST]!');