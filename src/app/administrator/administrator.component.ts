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
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})

export class AdministratorComponent implements OnInit, AfterViewInit {
  getSelectedForm: FormGroup;
  displayedColumns = ['select', 'id', 'code', 'name'];
  displayedColumnsSelected = ['id', 'code', 'name'];
  dataSource = new MatTableDataSource();
  dataSourceSelected = new MatTableDataSource();
  selection = new SelectionModel(true, []);
  arrayElements: any[] = [];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: TenantCurrencyService) { }

  ngOnInit(): void {
    this.getSelectedForm = new FormGroup({
      'tenantId': new FormControl(null),
      'defaultCurrencyId': new FormControl(null)
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
    let selectedId = this.arrayElements.map(a => a.id);
    this.service.addSelectedCurrency(this.getSelectedForm.value.tenantId, this.getSelectedForm.value.defaultCurrencyId, selectedId)
      .subscribe((res: any) => {
        console.log("get set def: " + res);
        this.dataSourceSelected.data = null;
      })
  }

  //////////////////////////////////////////FILTERING////////////////////////////////////////////
  doFilter(filterValue: string) {
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

}
