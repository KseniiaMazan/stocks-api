import express, {Request, Response} from 'express';

import getRequestController from "./controllers/controllers";

const app = express();

app.get(`/api/v1/stocks/`, getRequestController);

export default app;
