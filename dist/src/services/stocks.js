"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const lru_cache_1 = __importDefault(require("lru-cache"));
class Stock {
    constructor() {
        this.stocksCache = new lru_cache_1.default({ maxAge: 1000 * 60 * 60 });
    }
    getPrice(prices) {
        return {
            price: prices['05. price'],
        };
    }
    async getStockPrices(company, apiKey) {
        try {
            const { symbol, } = company;
            const cachedSymbol = this.stocksCache.get(symbol);
            if (cachedSymbol) {
                return cachedSymbol;
            }
            else {
                const result = await axios_1.default.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`);
                const pricesList = result.data['Global Quote'];
                const resultPrice = this.getPrice(pricesList);
                this.stocksCache.set(symbol, resultPrice);
                return resultPrice;
            }
            ;
        }
        catch (_a) {
            throw new Error('Can\'t load stocks');
        }
        ;
    }
}
exports.default = Stock;
;
