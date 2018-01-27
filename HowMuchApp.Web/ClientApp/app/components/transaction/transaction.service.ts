import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Transaction } from '../../models/transaction.interface';

import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/Rx';

import { ConfigService } from '../../shared/services/config.service';

const CREATE_ACTION = 'create';
const UPDATE_ACTION = 'update';
const REMOVE_ACTION = 'destroy';

@Injectable()

export class TransactionService extends BehaviorSubject<any[]> {

    baseUrl: string = '';
    constructor(private http: HttpClient, private configService: ConfigService) {
        super([]);
        this.baseUrl = configService.getApiURI();
    }

    private data: Transaction[] = [];

    public read() {
        this.fetch()
            .do(data => {
                this.data = data;
            })
            .subscribe(data => {
                super.next(data);
            });
    }


    private reset() {
        this.data = [];
    }

    private fetch(): Observable<Transaction[]> {
        return this.http
            .get(this.baseUrl+ '/Transaction/GetAllTransactions')
            .map((res) => {
               
                return <Transaction[]>res
            });
    }

    public save(data: any, isNew?: boolean) {
        const action = isNew ? CREATE_ACTION : UPDATE_ACTION;

        this.reset();

        this.fetch()
            .subscribe(() => this.read(), () => this.read());
    }

    public remove(data: any) {
        this.reset();

        this.fetch()
            .subscribe(() => this.read(), () => this.read());
    }

    public resetItem(dataItem: any) {
        if (!dataItem) { return; }

        // find orignal data item
        const originalDataItem = this.data.find(item => item.id === dataItem.id);

        // revert changes
        Object.assign(originalDataItem, dataItem);

        super.next(this.data);
    }

   
}

