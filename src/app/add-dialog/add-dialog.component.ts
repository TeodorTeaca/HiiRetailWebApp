import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TenantCurrencyService } from '../services/tenant-currency.service';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {
  addForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private service: TenantCurrencyService) { }

  ngOnInit(): void {
    this.addForm = new FormGroup({
      'code': new FormControl(null),
      'name': new FormControl(null),
      'tenantId': new FormControl(null),
      'default': new FormControl(false)
    })
  }

  addCurrency() {
    console.log('add: ' +
      this.addForm.value.code,
      this.addForm.value.name,
      this.addForm.value.tenantId
    );
    this.service.addCurrency(this.addForm.value.code, this.addForm.value.name, this.addForm.value.tenantId, this.addForm.value.default)
      .subscribe((res) => {
        console.log('add res: ' + res);
      })
  }

}
