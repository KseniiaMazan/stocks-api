import express, {Request, Response} from 'express';

import Company from './services/company';
import Stock from "./services/stocks";
import ResponseConstructor from './services/responseConstructor';
import { ResultPriceInfo } from "./types";

const app = express();
const company = new Company();
const stockPrice = new Stock();

const API_KEY: string = 'OKC0BT76URCJ1QBU';

export default app;

app.get(`/api/v1/`, async (req: Request, res: Response) => {
  try {
    const queryParameter: string = req.query.symbol;

    const companyInfo = await company.getCompaniesBySymbol(queryParameter, API_KEY);

    const price: ResultPriceInfo = await stockPrice.getStockPrices(companyInfo, API_KEY);

    const responseInstance = new ResponseConstructor(companyInfo, price, res);

    responseInstance.sendInfo();
  } catch (err) {
    const message: string = err.message || 'Sorry, something went wrong'

    res.status(500).json({ message });
  };
});
