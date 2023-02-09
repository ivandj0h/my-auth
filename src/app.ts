require('dotenv').config();

import express from 'express';
import config from 'config';
import dbConnection from "./utils/dbConnection";

const app = express();

const port = config.get<number>('port');
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  dbConnection();
});
