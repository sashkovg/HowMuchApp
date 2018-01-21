import { Component, Input } from '@angular/core';
import { CurrenciesService } from '../../currencies/currencies.service';
import { SpinnerComponent } from '../../loaders/spinner/spinner.component'

@Component({
    selector: 'currency',
    templateUrl: './currency.component.html',
    styleUrls: ['./currency.component.css']
})
export class CurrencyComponent {
    loading: boolean = true;
    errors: object = {};
    exchangeCurrentValue: number;
    delta: string;
    dateOfRate: string;
    scale: Number;
    @Input() code: string;
    @Input() symbol: string;

    constructor(private currencyService: CurrenciesService) {
       
    }

    ngOnInit() {
        this.loading = true;
        this.errors = {};

        this.currencyService.getCurrencyExhangeRates(this.code, new Date() )
            .finally(() => {
                setTimeout(() => {
                    this.loading = false;
                }, 2000)
            })
            .subscribe(
            result => {
                if (result) {
                    this.scale = parseInt(result.cur_Scale);
                    var day = new Date(result.date).getDate();
                    var monthIndex = new Date(result.date).getMonth() + 1;
                    var year = new Date(result.date).getFullYear();
                    this.dateOfRate = day + '-' + monthIndex + '-' + year;
                    this.exchangeCurrentValue = parseFloat(result.cur_OfficialRate);
                    this.currencyService.getCurrencyExhangeRates(this.code, new Date(new Date().setDate(new Date().getDate() - 1)))
                        .subscribe(
                        result => {
                            if (result) {
                                this.delta = (this.exchangeCurrentValue - parseFloat(result.cur_OfficialRate)).toFixed(4);
                            }
                        },
                        error => this.errors = error);
                }
            },
            error => this.errors = error);
    }

    ngOnDestroy() {

    }
}
