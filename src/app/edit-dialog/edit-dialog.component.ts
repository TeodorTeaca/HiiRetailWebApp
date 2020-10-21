import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TenantCurrencyService } from '../services/tenant-currency.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private tenantCurrensyService: TenantCurrencyService) { }

  ngOnInit(): void {
  }

}
