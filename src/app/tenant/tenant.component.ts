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
  selector: 'app-tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.css']
})

export class TenantComponent implements OnInit, AfterViewInit {
  addForm: FormGroup;
  getSelectedForm: FormGroup;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns = ['id', 'code', 'name', 'actions'];
  displayedColumnsSelected = ['tenantId', 'code'];

  dataSource = new MatTableDataSource();
  dataSourceSelected = new MatTableDataSource();

  selection = new SelectionModel(true, []);

  arrayElements: any[] = [];

  constructor(private service: TenantCurrencyService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.addForm = new FormGroup({
      'code': new FormControl(null),
      'name': new FormControl(null),
      'tenantId': new FormControl(null),
      'default': new FormControl(false)
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

  addCurrency() {
    console.log('add: ' + this.addForm.value.code, this.addForm.value.name, this.addForm.value.tenantId, this.addForm.value.default
    );
    this.service.addCurrency(this.addForm.value.code, this.addForm.value.name, this.addForm.value.tenantId, this.addForm.value.default)
      .subscribe((res) => {
        this.getAllCurrencies();
        console.log('add res: ' + res);
      })
    this.addForm.reset();
  }

  ////////////////////////////////////////////////ACTIONS/////////////////////////////////////////////////
  addNew() {
    const dialogRef = this.dialog.open(AddDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'true') {
        console.log(result);
        this.getAllCurrencies();
      }
    });
  }

  deleteItem(currencyId, name) {
    console.log('input:' + currencyId);
    const dialogRef = this.dialog.open(DeleteDialogComponent, { data: { name: name } });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'true') {
        this.service.deleteCurrency(currencyId)
          .subscribe((res) => {
            this.getAllCurrencies();
            console.log('deleted:' + res);
          })
      }
    });
  }

  //////////////////////////////////////////FILTERING////////////////////////////////////////////
  doFilter(filterValue: string) {
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

}
