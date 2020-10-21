import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { TenantCurrencyService } from '../services/tenant-currency.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { TenantCurency } from '../models/tenant-curency';
import { MatDialog } from '@angular/material/dialog';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})

export class CustomerComponent implements OnInit, AfterViewInit {
  getForm: FormGroup;
  putDefaultForm: FormGroup;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns = ['id', 'code', 'name'];

  dataSource = new MatTableDataSource();

  constructor(private service: TenantCurrencyService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getForm = new FormGroup({
      'tenantId': new FormControl(null),
    });
    this.putDefaultForm = new FormGroup({
      'tenantId': new FormControl(null),
      'currencyId': new FormControl(null)
    });

    this.getAllCurrencies();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ////////////////////////////////////////////////SERVICES/////////////////////////////////////////////////
  getAllCurrencies() {
    this.service.getAllCurrencies().subscribe((res: any) => {
      this.dataSource.data = res;
      console.log('get res: ' + res);
    })
  }
  getTenantCurrency() {
    this.service.getTenantCurrency(this.getForm.value.tenantId)
      .subscribe((res: any) => {
        this.dataSource.data = res;
        console.log('get res: ' + res);
      })
  }
  putDefaultCurrency() {
    this.service.changeDefaultCurrency(this.putDefaultForm.value.tenantId, this.putDefaultForm.value.currencyId)
      .subscribe((res: any) => {
        console.log('get res: ' + res);
      })
  }

  //////////////////////////////////////////FILTERING////////////////////////////////////////////
  doFilter(filterValue: string) {
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

}
