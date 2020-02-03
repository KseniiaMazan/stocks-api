import axios, {AxiosResponse} from "axios";
import {CompaniesList, GlobalQuote, ResponseCompaniesSearch, ResponseGlobalQuote} from "../types";

const API_KEY: string = 'OKC0BT76URCJ1QBU';

class RequestServices {
  private readonly API_KEY: string

  constructor(apiKey: string) {
    this.API_KEY = apiKey;
  }

  public async getCompaniesBySymbol (symbol: string): Promise<ResponseCompaniesSearch> {
    try {
      const response = await axios.get<ResponseCompaniesSearch>(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol.toUpperCase()}&apikey=${this.API_KEY}`);

      return response.data;
    } catch (e) {
      throw e;
    }
  }

  public async getStocksBySymbol(symbol: string): Promise<ResponseGlobalQuote> {
    try {
      const response =  await axios.get<ResponseGlobalQuote>(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${this.API_KEY}`);

      return response.data;
    } catch (e) {
      throw e;
    };
  };
};

export const requestServices = new RequestServices(API_KEY);
