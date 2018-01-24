import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from '../../router.animations';
import { UserService } from '../../shared/services/user.service';
import { Subscription } from 'rxjs';
import { products } from './products';


@Component({
    selector: 'app-transaction',
    template: `
        <kendo-grid [data]="gridData" [height]="410">
            <kendo-grid-column field="ProductID" title="ID" width="40">
            </kendo-grid-column>
            <kendo-grid-column field="ProductName" title="Name" width="250">
            </kendo-grid-column>
            <kendo-grid-column field="Category.CategoryName" title="Category">
            </kendo-grid-column>
            <kendo-grid-column field="UnitPrice" title="Price" width="80">
            </kendo-grid-column>
            <kendo-grid-column field="UnitsInStock" title="In stock" width="80">
            </kendo-grid-column>
            <kendo-grid-column field="Discontinued" title="Discontinued" width="120">
                <ng-template kendoGridCellTemplate let-dataItem>
                    <input type="checkbox" [checked]="dataItem.Discontinued" disabled/>
                </ng-template>
            </kendo-grid-column>
        </kendo-grid>
    `
})

export class TransactionComponent implements OnInit {
    loading: boolean = false;
    subscription: Subscription;
    public gridData: any[] = products;
    errors: object = {};

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
    }
    ngOnDestroy() {
    
    }
}
