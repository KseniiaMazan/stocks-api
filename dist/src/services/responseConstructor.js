"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseConstructor {
    constructor(companyInfo, stockPrice, response) {
        const { name, currency } = companyInfo;
        const resultCompanyInfo = {
            name,
            currency,
            ...stockPrice,
        };
        this.resultCompanyInfo = resultCompanyInfo;
        this.response = response;
    }
    sendInfo() {
        this.response.status(200).json(this.resultCompanyInfo);
    }
}
exports.default = ResponseConstructor;
;
