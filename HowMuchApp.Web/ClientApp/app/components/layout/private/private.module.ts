import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrivateComponent } from '../../../components/layout/private/private.component';

import { NavMenuComponent } from '../../navmenu/navmenu.component';
import { Routes, RouterModule } from '@angular/router';
import { UserService } from '../../../shared/services/user.service';
import { HomeModule } from '../../home/home.module'


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule,
        HomeModule 
    ],
    declarations: [PrivateComponent, NavMenuComponent],
    providers: [UserService]
})
export class PrivateModule { }
