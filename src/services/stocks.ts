import LRU from 'lru-cache';
import {
  CompanyInfo,
  CompanyStockPrice,
  GlobalQuote,
  GlobalQuoteKey,
  ResponseGlobalQuote,
  ResultPriceInfo
} from "../types";
import LRUCache from "lru-cache";
import {requestServices} from "./requestServices";


export default class Stock {
  private stocksCache: LRUCache<string, ResultPriceInfo> = new LRU({ maxAge: 1000 * 60 * 60 })

  private getPrice(prices: GlobalQuote): ResultPriceInfo {
    return {
      price: prices[CompanyStockPrice.Price],
    };
  }

  public async getStockPrices(company: CompanyInfo): Promise<ResultPriceInfo> {
    try {
      const {
        symbol,
      } = company;

      const cachedSymbol: ResultPriceInfo | undefined = this.stocksCache.get(symbol);

      if (cachedSymbol) {
        return cachedSymbol;
      } else {

        const result: ResponseGlobalQuote = await requestServices.getStocksBySymbol(symbol);

        const pricesList: GlobalQuote = result[GlobalQuoteKey.GlobalQuote];

        const resultPrice: ResultPriceInfo =  this.getPrice(pricesList);

        this.stocksCache.set(symbol, resultPrice);

        return resultPrice;
      };
    } catch {
      throw new Error('Can\'t load stocks');
    };
  }
};
