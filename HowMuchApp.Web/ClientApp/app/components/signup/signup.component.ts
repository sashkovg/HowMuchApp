import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { routerTransition } from '../../router.animations';
import { UserSignUp } from '../../models/UserSignUp.interface';
import { Router } from '@angular/router';
import { KeysPipe } from '../../shared/pipes/keys.pipes';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {
    constructor(private userService: UserService, public router: Router) {

    }
    model: any = {};
    errors: object = {};
    loading: boolean = false;

    ngOnInit() {
    }


    register() {
        this.loading = true;
     
        this.errors = {};
        this.userService.register(this.model.email, this.model.password, this.model.confirm_password)
            .finally(() => this.loading = false)
                .subscribe(
                result => {
                    if (result) {
                        this.router.navigate(['/login'], { queryParams: { brandNew: true, email: this.model.email } });
                    }
                },
                errors => {
                    this.errors = errors
                }
                );
       
    }

}
