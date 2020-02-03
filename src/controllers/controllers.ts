import {Request, Response} from "express";
import {ResultPriceInfo} from "../types";
import ResponseConstructor from "../services/responseConstructor";
import Company from "../services/company";
import Stock from "../services/stocks";


const company = new Company();
const stockPrice = new Stock();

const getRequestController = async (req: Request, res: Response): Promise<void> => {
  try {
    const queryParameter: string = req.query.symbol;

    const companyInfo = await company.getCompaniesBySymbol(queryParameter);

    const price: ResultPriceInfo = await stockPrice.getStockPrices(companyInfo);

    const responseInstance = new ResponseConstructor(companyInfo, price, res);

    responseInstance.sendInfo();
  } catch (err) {
    const message: string = err.message || 'Sorry, something went wrong'

    res.status(500).json({ message });
  };
};

export default getRequestController;
