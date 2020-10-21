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
    private tenantCurrensyService: TenantCurrencyService) { }

  ngOnInit(): void {
    this.addForm = new FormGroup({
      'tenantId': new FormControl(null, Validators.required),
      'code': new FormControl(null, Validators.required)
    })
  }

  addTenantCurrency() {
    console.log('add: ' + this.addForm.value.tenantId, this.addForm.value.code);
    // this.tenantCurrensyService.addCurrency(this.addForm.value.tenantId, this.addForm.value.code)
    //   .subscribe((res) => {
    //     // this.dataSource = res;
    //     console.log("add res: " + res);
    //   })
  }

}
