import { Component, ViewEncapsulation } from '@angular/core';
import { CurrenciesService } from '../../currencies/currencies.service';
import { SpinnerComponent } from '../../loaders/spinner/spinner.component'

@Component({
    selector: 'bitcoin',
    templateUrl: './bitcoin.component.html',
    styleUrls: ['./bitcoin.component.css']
})
export class BitcoinComponent {
    loading: boolean = true;
    errors: object = {};
    exchangeCurrentValue: number;
    delta: string;
    timer: any;

    constructor(private criptoService: CurrenciesService) {
        this.getBitcoinExchangeValue();
    }

    ngOnInit() {
        var timer = setInterval((x) => { this.getBitcoinExchangeValue(); }, 30000);
    }

    getBitcoinExchangeValue() {
        this.loading = true;
        this.errors = {};
        this.criptoService.getBitcoinExchangeRates({ currency: 'USD', isCurrent: true })
            .finally(() => {
                setTimeout(() => {
                    this.loading = false;
                },2000)
            })
            .subscribe(
            result => {
                if (result) {
                    this.exchangeCurrentValue = result;
                    this.criptoService.getBitcoinExchangeRates({ currency: 'USD', isCurrent: false })
                        .subscribe(
                        result => {
                            if (result) {
                                this.delta = (this.exchangeCurrentValue - result).toFixed(2);
                            }
                        },
                        error => this.errors = error);
                }
            },
            error => this.errors = error);
    }

    ngOnDestroy() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }
}
