"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const API_KEY = 'OKC0BT76URCJ1QBU';
class RequestServices {
    constructor(apiKey) {
        this.API_KEY = apiKey;
    }
    async getCompaniesBySymbol(symbol) {
        try {
            const response = await axios_1.default.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol.toUpperCase()}&apikey=${this.API_KEY}`);
            return response.data;
        }
        catch (e) {
            throw e;
        }
    }
    async getStocksBySymbol(symbol) {
        try {
            const response = await axios_1.default.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${this.API_KEY}`);
            return response.data;
        }
        catch (e) {
            throw e;
        }
        ;
    }
    ;
}
;
exports.requestServices = new RequestServices(API_KEY);
