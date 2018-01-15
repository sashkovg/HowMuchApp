import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { routerTransition } from '../../router.animations';
import { UserSignUp } from '../../models/UserSignUp.interface';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, FormBuilder, FormControlName, NgForm} from '@angular/forms';
import { KeysPipe } from '../../shared/pipes/keys.pipes';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {
    constructor(private userService: UserService, public router: Router, public fb: FormBuilder) { 
        this.signupForm = this.fb.group({
            email: ['', Validators.compose([Validators.required, Validators.email])],
            password: ['', [Validators.required]],
            confirmPassword: ['', [Validators.required]]
        })  
    }

    errors: object = {};
    isRequesting: boolean = false;
    submitted: boolean = false;
    signupForm: FormGroup; 


    ngOnInit() {
      
    }

    registerUser({ value, valid }: { value: UserSignUp, valid: boolean }) {
        this.submitted = true;
        this.isRequesting = true;
        this.errors = {};
        if (valid) {
            this.userService.register(value.email, value.password, value.confirmPassword)
                .finally(() => this.isRequesting = false)
                .subscribe(
                result => {
                    if (result) {
                        this.router.navigate(['/login'], { queryParams: { brandNew: true, email: value.email } });
                    }
                },
                errors => {
                    this.errors = errors
                }
                );
        }
    }
}
