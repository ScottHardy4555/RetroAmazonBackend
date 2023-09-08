import express from 'express';
import { BookRouter } from './routes/api/books.js';
import * as dotenv from 'dotenv';
import debug from 'debug';
dotenv.config();

//create a debug channel called app:Server
const debugServer = debug('app:Server.js');

const app = express();

//middleware
//allow form data
app.use(express.urlencoded({ extended: true }));
app.use('/api/books', BookRouter);

//error handling middleware to handle routes not found
app.use((req, res) => {
  res.status(404).send({ error: `Sorry couldn't find ${req.originalUrl}` });
});

//default route
app.get('/', (req, res) => {
  res.send('Hello World');
  debugServer('Hello from the upgraded console.log()!');
});

// eslint-disable-next-line no-undef
const port = process.env.PORT || 3003;

app.listen(port, () => {
  debugServer(`Server is listening on http://localHost:${port}`);
});
