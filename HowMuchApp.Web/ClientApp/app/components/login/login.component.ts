import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
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

    loginForm: FormGroup;
    brandNew: boolean;
    errors: object = {};
    isRequesting: boolean = false;
    submitted: boolean = false;
    subscription: Subscription;

    constructor(private userService: UserService, public router: Router, public fb: FormBuilder, private activatedRoute: ActivatedRoute) {
        this.loginForm = this.fb.group({
            email: ['', Validators.compose([Validators.required, Validators.email])],
            password: ['', [Validators.required]]
        })  
    }
   

    ngOnInit() {
       
        // subscribe to router event
        this.subscription = this.activatedRoute.queryParams.subscribe(
            (param: any) => {
                this.brandNew = param['brandNew'];
                this.loginForm.patchValue({
                    email: param['email'],
                   
                });
            });      
    }

    ngOnDestroy() {
        // prevent memory leak by unsubscribing
        this.subscription.unsubscribe();
    }

    login({ value, valid }: { value: UserSignIn, valid: boolean }) {
        this.submitted = true;
        this.isRequesting = true;
        this.errors = {};
        if (valid) {
            this.userService.login(value.email, value.password)
                .finally(() => this.isRequesting = false)
                .subscribe(
                result => {
                    if (result) {
                        this.router.navigate(['/home']);
                    }
                },
                error => this.errors = error);
        }
    }
}
