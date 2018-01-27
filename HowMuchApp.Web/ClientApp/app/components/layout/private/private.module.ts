import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrivateComponent } from '../../../components/layout/private/private.component';
import { TransactionComponent } from '../../transaction/transaction.component';
import { NavMenuComponent } from '../../navmenu/navmenu.component';
import { Routes, RouterModule } from '@angular/router';
import { UserService } from '../../../shared/services/user.service';
import { TransactionService } from '../../transaction/transaction.service';
import { HomeModule } from '../../home/home.module'
import { GridModule } from '@progress/kendo-angular-grid';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { TransactionEditFormComponent } from '../../transaction/edit_form/transaction_edit_form.component'


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule,
        HomeModule,
        GridModule,
        HttpClientModule,
        DialogModule
    ],
    declarations: [PrivateComponent, NavMenuComponent, TransactionComponent, TransactionEditFormComponent],
    providers: [UserService, TransactionService, HttpClient ]
})
export class PrivateModule { }
