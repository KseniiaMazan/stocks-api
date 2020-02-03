"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const responseConstructor_1 = __importDefault(require("../services/responseConstructor"));
const company_1 = __importDefault(require("../services/company"));
const stocks_1 = __importDefault(require("../services/stocks"));
const company = new company_1.default();
const stockPrice = new stocks_1.default();
const getRequestController = async (req, res) => {
    try {
        const queryParameter = req.query.symbol;
        const companyInfo = await company.getCompaniesBySymbol(queryParameter);
        const price = await stockPrice.getStockPrices(companyInfo);
        const responseInstance = new responseConstructor_1.default(companyInfo, price, res);
        responseInstance.sendInfo();
    }
    catch (err) {
        const message = err.message || 'Sorry, something went wrong';
        res.status(500).json({ message });
    }
    ;
};
exports.default = getRequestController;
