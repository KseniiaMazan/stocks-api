import {CompanyInfo, ResponseCompanyInfo, ResultPriceInfo} from "../types";
import {Response} from "express";

export default class ResponseConstructor {
  resultCompanyInfo: ResponseCompanyInfo | null

  response: Response

  constructor(companyInfo: CompanyInfo, stockPrice: ResultPriceInfo, response: Response) {
    const { name, currency } = companyInfo;

    const resultCompanyInfo: ResponseCompanyInfo = {
      name,
      currency,
      ...stockPrice,
    };

    this.resultCompanyInfo = resultCompanyInfo;
    this.response = response;
  }

  public sendInfo():void {
    this.response.status(200).json(this.resultCompanyInfo);
  }
};
