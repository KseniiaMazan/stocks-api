"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lru_cache_1 = __importDefault(require("lru-cache"));
const types_1 = require("../types");
const requestServices_1 = require("./requestServices");
class Stock {
    constructor() {
        this.stocksCache = new lru_cache_1.default({ maxAge: 1000 * 60 * 60 });
    }
    getPrice(prices) {
        return {
            price: prices[types_1.CompanyStockPrice.Price],
        };
    }
    async getStockPrices(company) {
        try {
            const { symbol, } = company;
            const cachedSymbol = this.stocksCache.get(symbol);
            if (cachedSymbol) {
                return cachedSymbol;
            }
            else {
                const result = await requestServices_1.requestServices.getStocksBySymbol(symbol);
                const pricesList = result[types_1.GlobalQuoteKey.GlobalQuote];
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
