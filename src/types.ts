export enum CompanyKeys {
  Symbol = '1. symbol',
  Name = '2. name',
  Currency = '8. currency',
}

export enum CompanyStockPrice {
  Price = '05. price',
};

export interface CompanyType {
  [CompanyKeys.Symbol]: string;
  [CompanyKeys.Name]: string;
  '3. type': string;
  '4. region': string;
  '5. marketOpen': string;
  '6. marketClose': string;
  '7. timezone': string;
  [CompanyKeys.Currency]: string;
  '9. matchScore': string;
};

export type CompaniesList = CompanyType[];

export interface ResponseCompaniesSearch {
  'bestMatches': CompaniesList;
};

export type CompanyInfo = {
  name: string;
  symbol: string;
  currency: string;
};

export interface GlobalQuote {
  '01. symbol': string;
  '02. open': string;
  '03. high': string;
  '04. low': string;
  [CompanyStockPrice.Price]: string;
  '06. volume': string;
  '07. latest trading day': string;
  '08. previous close': string;
  '09. change': string;
  '10. change percent': string;
};

export enum GlobalQuoteKey {
  GlobalQuote = 'Global Quote',
};

export interface ResponseGlobalQuote {
  [GlobalQuoteKey.GlobalQuote]: GlobalQuote;
};

export interface ResultPriceInfo {
  price: string;
};

export interface ResponseCompanyInfo {
  name: string;
  currency: string;
  price: string;
}
