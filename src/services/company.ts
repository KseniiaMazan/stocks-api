import axios from 'axios';
import LRU from 'lru-cache';

import {CompaniesList, CompanyInfo, CompanyType } from "../types";
import LRUCache from "lru-cache";

export default class Company {
  private companiesCache: LRUCache<string, CompanyInfo> = new LRU({ maxAge: 1000 * 60 * 60 })

  constructor() {
  }

  private filterCompaniesByBestMatch(companiesList: CompaniesList): CompanyInfo {
    const bestMatch: CompanyType = companiesList[0];

    const resultCompanyInfo: CompanyInfo = {
      name: bestMatch['2. name'],
      symbol: bestMatch['1. symbol'],
      currency: bestMatch['8. currency'],
    };

    return resultCompanyInfo;
  }

  public async getCompaniesBySymbol (symbol: string, apikey: string): Promise<CompanyInfo> {
    try {
      const cachedCompanyInfo: CompanyInfo | undefined = this.companiesCache.get(symbol);

      if (cachedCompanyInfo) {
        return cachedCompanyInfo;
      } else {
        const response = await axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol.toUpperCase()}&apikey=${apikey}`);
        const companies: CompaniesList = response.data.bestMatches;

        const resultInfo = this.filterCompaniesByBestMatch(companies);

        this.companiesCache.set(symbol, resultInfo);

        return resultInfo;
      }
    } catch {
      throw new Error('Can\'t load companies list');
    }
  }
};
