"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const company_1 = __importDefault(require("./services/company"));
const stocks_1 = __importDefault(require("./services/stocks"));
const responseConstructor_1 = __importDefault(require("./services/responseConstructor"));
const app = express_1.default();
const company = new company_1.default();
const stockPrice = new stocks_1.default();
const API_KEY = 'OKC0BT76URCJ1QBU';
exports.default = app;
app.get(`/api/v1/`, async (req, res) => {
    try {
        const queryParameter = req.query.symbol;
        const companyInfo = await company.getCompaniesBySymbol(queryParameter, API_KEY);
        const price = await stockPrice.getStockPrices(companyInfo, API_KEY);
        const responseInstance = new responseConstructor_1.default(companyInfo, price, res);
        responseInstance.sendInfo();
    }
    catch (err) {
        const message = err.message || 'Sorry, something went wrong';
        res.status(500).json({ message });
    }
    ;
});
