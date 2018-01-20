import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from '../../login/login.component';
import { SignupComponent} from '../../signup/signup.component';
import { KeysPipe } from '../../../shared/pipes/keys.pipes';
import { UserService } from '../../../shared/services/user.service';
import { PublicComponent } from '../../../components/layout/public/public.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule
       
    ],
    declarations: [SignupComponent, KeysPipe, LoginComponent, PublicComponent],
    providers: [UserService]
})
export class PublicModule { }
