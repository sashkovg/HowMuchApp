import { NgModule,ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { Routes, RouterModule } from '@angular/router';
import { BitcoinComponent } from '../../components/currencies/cryptocurrency/bitcoin.component';
import { CriptoCurrenciesService } from '../../components/currencies/criptocurrencies.service';
import { SpinnerComponent } from '../../components/loaders/spinner/spinner.component'

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule
       
    ],
    declarations: [HomeComponent, BitcoinComponent, SpinnerComponent],
    providers: [CriptoCurrenciesService]
})
export class HomeModule {}
