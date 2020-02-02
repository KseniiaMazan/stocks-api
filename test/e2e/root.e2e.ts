import request from 'supertest';
import nock from 'nock';

import app from '../../src/app';

describe('Stocks API', () => {

  it('should return stocks and company name on request', async () => {
    const scope = nock('https://www.alphavantage.co')
      .get('/query?function=SYMBOL_SEARCH&keywords=WIX&apikey=OKC0BT76URCJ1QBU')
      .reply(200,{
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
        ]});

      const scope2 = nock('https://www.alphavantage.co')
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

      const response = await request(app)
        .get('/api/v1/')
        .set('Accept', 'application/json')
        .query({
          symbol: 'WIX',
        });

      const responseExample = {
        name: 'Wix.com Ltd.',
        currency: 'USD',
        price: '143.7500',
      };

      expect(response.status).toEqual(200);
      expect(response.body.name).toEqual(responseExample.name);
      expect(response.body.currency).toEqual(responseExample.currency);

      scope.done();
      scope2.done();
  });

   it('should return error when request on company names has failed', async () => {
     const scope = nock('https://www.alphavantage.co')
       .get('/query?function=SYMBOL_SEARCH&keywords=W&apikey=OKC0BT76URCJ1QBU')
       .reply(200,{
         "bestMatches": null
       });

     const response = await request(app)
       .get('/api/v1/')
       .set('Accept', 'application/json')
       .query({
         symbol: 'W',
       });

     expect(response.status).toEqual(500);
     expect(response.body.message).toEqual('Can\'t load companies list');

     scope.done();
   });

  it('should return stocks and company name on request', async () => {
    const scope = nock('https://www.alphavantage.co')
      .get('/query?function=SYMBOL_SEARCH&keywords=WI&apikey=OKC0BT76URCJ1QBU')
      .reply(200,{
        "bestMatches": [
          {
            "1. symbol": "WMB",
            "2. name": "The Williams Companies Inc.",
            "3. type": "Equity",
            "4. region": "United States",
            "5. marketOpen": "09:30",
            "6. marketClose": "16:00",
            "7. timezone": "UTC-05",
            "8. currency": "USD",
            "9. matchScore": "0.8000"
          }
        ]});

    const scope2 = nock('https://www.alphavantage.co')
      .get('/query?function=GLOBAL_QUOTE&symbol=WMB&apikey=OKC0BT76URCJ1QBU')
      .reply(200, {
        "Global Quote": null,
      });

    const response = await request(app)
      .get('/api/v1/')
      .set('Accept', 'application/json')
      .query({
        symbol: 'WI',
      });

    expect(response.status).toEqual(500);
    expect(response.body.message).toEqual('Can\'t load stocks');

    scope.done();
    scope2.done();
  });

});