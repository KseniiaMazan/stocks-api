"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nock_1 = __importDefault(require("nock"));
const company_1 = __importDefault(require("../../src/services/company"));
const stocks_1 = __importDefault(require("../../src/services/stocks"));
const companiesList = new company_1.default();
const stocks = new stocks_1.default();
const companyInfo = {
    name: 'Wix.com Ltd.',
    symbol: 'WIX',
    currency: 'USD',
};
describe('Companies list request', () => {
    it('should return companies list by special query parameter', async () => {
        const scope = nock_1.default('https://www.alphavantage.co')
            .get('/query?function=SYMBOL_SEARCH&keywords=WIX&apikey=OKC0BT76URCJ1QBU')
            .reply(200, {
            "bestMatches": [
                {
                    "1. symbol": "WIX",
                    "2. name": "Wix.com Ltd.",
                    "3. type": "Equity",
                    "4. region": "United States",
                    "5. marketOpen": "09:30",
                    "6. marketClose": "16:00",
                    "7. timezone": "UTC-05",
                    "8. currency": "USD",
                    "9. matchScore": "1.0000"
                }
            ]
        });
        const responseInfo = await companiesList.getCompaniesBySymbol('WIX');
        console.log(responseInfo);
        expect(responseInfo).toEqual(companyInfo);
        scope.done();
    });
});
describe('Stocks request', () => {
    it('should return stocks price by company symbol', async () => {
        const scope = nock_1.default('https://www.alphavantage.co')
            .get('/query?function=GLOBAL_QUOTE&symbol=WIX&apikey=OKC0BT76URCJ1QBU')
            .reply(200, {
            "Global Quote": {
                "01. symbol": "WIX",
                "02. open": "144.8000",
                "03. high": "145.2600",
                "04. low": "143.7500",
                "05. price": "143.7500",
                "06. volume": "28725",
                "07. latest trading day": "2020-01-31",
                "08. previous close": "144.9100",
                "09. change": "-1.1600",
                "10. change percent": "-0.8005%"
            }
        });
        const resultPrice = await stocks.getStockPrices(companyInfo);
        expect(resultPrice).toEqual({
            price: '143.7500',
        });
        scope.done();
    });
});
