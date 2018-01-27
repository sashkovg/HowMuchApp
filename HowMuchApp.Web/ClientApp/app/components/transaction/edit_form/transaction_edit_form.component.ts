import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Transaction } from '../../../models/transaction.interface';



@Component({
    selector: 'transaction-grid-edit-form',
    styles: [
        'input[type=text] { width: 100%; }'
    ],
    templateUrl: './transaction_edit_form.component.html',
})

export class TransactionEditFormComponent {
    public active = false;
    public editForm: FormGroup = new FormGroup({
        'ProductID': new FormControl(),
        'ProductName': new FormControl('', Validators.required),
        'UnitPrice': new FormControl(0),
        'UnitsInStock': new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[0-9]{1,3}')])),
        'Discontinued': new FormControl(false)
    });

    @Input() public isNew = false;

    @Input() public set model(trans: Transaction) {
        this.editForm.reset(trans);

        this.active = trans !== undefined;
    }

    @Output() cancel: EventEmitter<any> = new EventEmitter();
    @Output() save: EventEmitter<Transaction> = new EventEmitter();

    public onSave(e: { preventDefault: () => void; }): void {
        e.preventDefault();
        this.save.emit(this.editForm.value);
        this.active = false;
    }

    public onCancel(e: { preventDefault: () => void; }): void {
        e.preventDefault();
        this.closeForm();
    }

    private closeForm(): void {
        this.active = false;
        this.cancel.emit();
    }
}
