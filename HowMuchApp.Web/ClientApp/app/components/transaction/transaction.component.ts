import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from '../../router.animations';
import { UserService } from '../../shared/services/user.service';
import { Subscription } from 'rxjs';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import { Observable } from 'rxjs/Observable';
import { Transaction } from '../../models/transaction.interface'
import { TransactionService } from './transaction.service';

@Component({
    selector: 'app-transaction',
    templateUrl: './transaction.component.html',
})

export class TransactionComponent implements OnInit {
    public view: Observable<GridDataResult>;
    public gridState: State = {
        sort: [],
        skip: 0,
        take: 10
    };

    public editDataItem: Transaction | undefined;
    public isNew: boolean;
    private editService: TransactionService;

    errors: object = {};
    constructor(transactionService: TransactionService) {
        this.editService = transactionService;
    }

    ngOnInit(): void {
        this.view = this.editService.map(data => process(data, this.gridState));
        this.editService.read();
    }

    public onStateChange(state: State) {
        this.gridState = state;

        this.editService.read();
    }
    public addHandler() {
        this.editDataItem = <Transaction>{};
        this.isNew = true;
    }

    public editHandler(dataItem: Transaction) {
        this.editDataItem = dataItem;
        this.isNew = false;
    }

    public cancelHandler() {
        this.editDataItem = undefined;
    }

    public saveHandler(trans: Transaction) {
        this.editService.save(trans, this.isNew);
        this.editDataItem = undefined;
    }

    public removeHandler(dataItem: Transaction) {
        this.editService.remove(dataItem);
    }

}
