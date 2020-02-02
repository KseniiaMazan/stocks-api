import axios from 'axios';
import LRU from 'lru-cache';
import { CompanyInfo, GlobalQuote, ResultPriceInfo } from "../types";
import LRUCache from "lru-cache";


export default class Stock {
  private stocksCache: LRUCache<string, ResultPriceInfo> = new LRU({ maxAge: 1000 * 60 * 60 })

  constructor() {
  }

  private getPrice(prices: GlobalQuote): ResultPriceInfo {
    return {
      price: prices['05. price'],
    };
  }

  public async getStockPrices(company: CompanyInfo, apiKey: string): Promise<ResultPriceInfo> {
    try {
      const {
        symbol,
      } = company;

      const cachedSymbol: ResultPriceInfo | undefined = this.stocksCache.get(symbol);

      if (cachedSymbol) {
        return cachedSymbol;
      } else {

        const result = await axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`);

        const pricesList: GlobalQuote = result.data['Global Quote'];

        const resultPrice: ResultPriceInfo =  this.getPrice(pricesList);

        this.stocksCache.set(symbol, resultPrice);

        return resultPrice;
      };
    } catch {
      throw new Error('Can\'t load stocks');
    };
  }
};
