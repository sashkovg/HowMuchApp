﻿import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrivateComponent } from '../../../components/layout/private/private.component';
import { TransactionComponent } from '../../transaction/transaction.component';
import { NavMenuComponent } from '../../navmenu/navmenu.component';
import { Routes, RouterModule } from '@angular/router';
import { UserService } from '../../../shared/services/user.service';
import { HomeModule } from '../../home/home.module'
import { GridModule } from '@progress/kendo-angular-grid';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule,
        HomeModule,
        GridModule
    ],
    declarations: [PrivateComponent, NavMenuComponent, TransactionComponent],
    providers: [UserService]
})
export class PrivateModule { }
