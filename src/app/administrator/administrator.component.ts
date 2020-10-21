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

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})

export class AdministratorComponent implements OnInit, AfterViewInit {
  getSelectedForm: FormGroup;
  displayedColumns = ['select', 'tenantId', 'code'];
  displayedColumnsSelected = ['tenantId', 'code'];
  dataSource = new MatTableDataSource();
  dataSourceSelected = new MatTableDataSource();
  selection = new SelectionModel(true, []);
  arrayElements: any[] = [];
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: TenantCurrencyService) { }

  ngOnInit(): void {
    this.getSelectedForm = new FormGroup({
    });

    this.getAllCurrencies();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ////////////////////////////////////////////////SERVICES/////////////////////////////////////////////////
  getAllCurrencies() {
    this.service.getAllCurrencies().subscribe((res: any) => {
      this.dataSource.data = res;
      console.log("get res: " + res);
    })
  }

  //////////////////////////////////////////SELECTIONS////////////////////////////////////////////
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
  selectTrigher() {
    this.dataSourceSelected.data = this.selection.selected;
  }
  getSelected() {
    this.arrayElements = this.selection.selected;
    this.service.addSelectedCurrency(this.arrayElements);
    this.dataSourceSelected.data = null;
  }

  //////////////////////////////////////////FILTERING////////////////////////////////////////////
  doFilter(filterValue: string) {
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

}
