import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from '../../router.animations';
import { UserSignIn } from '../../models/UserSignIn.interface';
import { UserService } from '../../shared/services/user.service';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, FormBuilder, FormControlName, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    animations: [routerTransition()]
})

export class LoginComponent implements OnInit {

    model: UserSignIn = {
        email: '',
        password: ''
    };
    loading: boolean = false;
    subscription: Subscription;
    brandNew: boolean;
    errors: object = {};

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router, private userService: UserService
    ) { }

    ngOnInit() {
        // subscribe to router event
        this.subscription = this.activatedRoute.queryParams.subscribe(
            (param: any) => {
                this.brandNew = param['brandNew'];
                this.model.email = param['email'];
            });

    }
    ngOnDestroy() {
        // prevent memory leak by unsubscribing
        this.subscription.unsubscribe();
    }

    login() {
        this.loading = true;
        this.errors = {};
            this.userService.login(this.model.email, this.model.password)
                .finally(() => this.loading = false)
                .subscribe(
                result => {
                    if (result) {
                        this.router.navigate(['/home']);
                    }
                },
                error => this.errors = error);
        }
}
