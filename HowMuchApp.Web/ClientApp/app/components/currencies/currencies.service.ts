import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/Rx';
import { BaseService } from "../../shared/services/base.service";
import { ConfigService } from '../../shared/services/config.service';

@Injectable()

export class CurrenciesService extends BaseService {
    //https://www.coindesk.com/price/
    exchangeBitcoinTodayUrl: string = 'https://api.coindesk.com/v1/bpi/currentprice.json';
    exchangeBitcoinYesterdayUrl: string = 'https://api.coindesk.com/v1/bpi/historical/close.json?for=yesterday';
    baseUrl: string;

    constructor(private http: Http, private configService: ConfigService) {
        super()
        this.baseUrl = configService.getApiURI();
    }

    getBitcoinExchangeRates({ currency, isCurrent }: { currency: string, isCurrent: boolean }): Observable<number>{
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http
            .get(isCurrent ? this.exchangeBitcoinTodayUrl : this.exchangeBitcoinYesterdayUrl)
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

    getCurrencyExhangeRates(currency: string, dateOn: Date) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
            .post(
            this.baseUrl + '/Currencies/GetExhangeRates',
            JSON.stringify({ currency, dateOn }), { headers }
            )
            .map(res => {
                return res.json();
            })
            .catch(this.handleError);
    }

}

