import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from '../../router.animations';
import { UserService } from '../../shared/services/user.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-transaction',
    templateUrl: './transaction.component.html',
    styleUrls: ['./transaction.component.css'],
    animations: [routerTransition()]
})

export class TransactionComponent implements OnInit {
    loading: boolean = false;
    subscription: Subscription;
  
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
