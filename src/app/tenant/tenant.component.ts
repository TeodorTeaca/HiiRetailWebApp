import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { TenantCurrencyService } from '../services/tenant-currency.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { TenantCurency } from '../models/tenant-curency';
import { MatDialog } from '@angular/material/dialog';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
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
      'code': new FormControl(null, Validators.required),
      'name': new FormControl(null, Validators.required),
      'tenantId': new FormControl(null)
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
      console.log("get res: " + res);
    })
  }

  addCurrency() {
    console.log('add: ' +
      this.addForm.value.code,
      this.addForm.value.name,
      this.addForm.value.tenantId
    );
    this.service.addCurrency(this.addForm.value.code, this.addForm.value.name, this.addForm.value.tenantId)
      .subscribe((res) => {
        this.getAllCurrencies();
        console.log("add res: " + res);
      })
  }

  ////////////////////////////////////////////////ACTIONS/////////////////////////////////////////////////
  addNew() {
    const dialogRef = this.dialog.open(AddDialogComponent, { data: { code: 'code' } });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { }
    });
  }
  startEdit(i, id, title) {
    const dialogRef = this.dialog.open(EditDialogComponent, { data: { code: 'code' } });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { }
    });
  }
  deleteItem(i, id, title) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, { data: { code: 'code' } });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { }
    });
  }

  //////////////////////////////////////////FILTERING////////////////////////////////////////////
  doFilter(filterValue: string) {
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

}
