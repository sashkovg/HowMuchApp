import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/Rx';
import { BaseService } from "../../shared/services/base.service";

@Injectable()

export class CriptoCurrenciesService extends BaseService {
    //https://www.coindesk.com/price/
    exchangeTodayUrl: string = 'https://api.coindesk.com/v1/bpi/currentprice.json';
    exchangeYesterdayUrl: string = 'https://api.coindesk.com/v1/bpi/historical/close.json?for=yesterday';
    constructor(private http: Http) {
        super();
    }

    getBitcoinExchangeRates({ currency, isCurrent }: { currency: string, isCurrent: boolean }): Observable<number>{
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http
            .get(isCurrent ? this.exchangeTodayUrl : this.exchangeYesterdayUrl)
            .map(res => {
                let value = res.json();
                if (value) {
                    if (isCurrent) {
                        return parseFloat(value.bpi.USD.rate.replace(',', '').replace(/[^\d.]/g, '')).toFixed(2);
                    } else {
                        return parseFloat(value.bpi[Object.keys(value.bpi)[0]]).toFixed(2);
                    }
                }
                return null;
            })
            .catch(this.handleError);
    }

}

