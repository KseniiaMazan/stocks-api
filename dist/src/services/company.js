"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lru_cache_1 = __importDefault(require("lru-cache"));
const requestServices_1 = require("./requestServices");
class Company {
    constructor() {
        this.companiesCache = new lru_cache_1.default({ maxAge: 1000 * 60 * 60 });
    }
    filterCompaniesByBestMatch(companiesList) {
        const bestMatch = companiesList[0];
        const resultCompanyInfo = {
            name: bestMatch['2. name'],
            symbol: bestMatch['1. symbol'],
            currency: bestMatch['8. currency'],
        };
        return resultCompanyInfo;
    }
    async getCompaniesBySymbol(symbol) {
        try {
            const cachedCompanyInfo = this.companiesCache.get(symbol);
            if (cachedCompanyInfo) {
                return cachedCompanyInfo;
            }
            else {
                const response = await requestServices_1.requestServices.getCompaniesBySymbol(symbol);
                const companies = response.bestMatches;
                const resultInfo = this.filterCompaniesByBestMatch(companies);
                this.companiesCache.set(symbol, resultInfo);
                return resultInfo;
            }
        }
        catch (_a) {
            throw new Error('Can\'t load companies list');
        }
    }
}
exports.default = Company;
;
