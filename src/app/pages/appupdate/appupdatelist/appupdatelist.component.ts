import { Component, OnInit, ViewChild, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Toaster } from '@ludo/helpers/toast.helper';
import { ConfirmDialogModel, ConfirmDialogComponent } from '@ludo/core/dialog/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';
import { forkJoin } from 'rxjs';
import { BuycoinsService } from '@ludo/core/buycoins/buycoins.service';
import { DashboardService } from '@ludo/core/dashboard/dashboard.service';
export interface appUpdateData {
  _id: string;
  phone: number;
  name: string;
  email: string;
  updatedID:string;
  is_active:string;
  type:boolean;
  version:number;
  link:any;
  whatsnew:any;
  version_type:any;
  created_on:any;
}
@Component({
  selector: 'app-appupdatelist',
  templateUrl: './appupdatelist.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./appupdatelist.component.scss']
})
export class AppupdatelistComponent implements OnInit , AfterViewInit {
  // displayedColumns: string[] = ['phone', 'name', 'email','is_active','type','version','link','whatsnew','version_type','created_on','_id', 'updatedID'];
  displayedColumns: string[] = ['phone', 'name','is_active','type','version','link','whatsnew','version_type','created_on'];
  dataSource: MatTableDataSource<appUpdateData>;
  DATAY: any;
  lastupdate: any;
  lastupdate1: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  setIndex:number;
  constructor(
    private _buyService: BuycoinsService,
    private dashService: DashboardService,
    private _toaster: Toaster,
    public dialog: MatDialog,
  ) {

  }
 
  ngAfterViewInit() {
    setTimeout(() => this.dataSource.paginator = this.paginator);
    setTimeout(() => this.dataSource.sort = this.sort);
  }

  openDialog(element, data, coins) {
    // console.log(element);
    // console.log(data);
    if (element == "Delete") {
      var showdata = `Room Coin : ` + coins;
      this.confirmDialog(data, showdata);
    }
  }

  confirmDialog(data, showdata): void {
    const message = `Are you sure you want to delete this?`;


    const dialogData = new ConfirmDialogModel("Confirm Action", message, showdata);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "600px",
      minWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(async dialogResult => {
      if (dialogResult) {
        var dataValue:any =   {"_id": data.toString() };
        (await this._buyService.deleteBuyCoin(dataValue)).subscribe(
          res => {
            var result: any = res;
            this.dataSource.filteredData.forEach( (item, index) => {
              if(item._id==data.toString()){
                this.setIndex = index;
              }
            });

            var datavalue = this.dataSource.filteredData;
             datavalue.splice(this.setIndex,1);
            this.dataSource = new MatTableDataSource(datavalue);
            this._toaster.success('Success!', `` + result.data.result);
          },
          err => { this._toaster.error('Failure!', ` Issue: ` + err.error.error); },
          () => console.log('HTTP request completed.')
        );

      }
    });
  }
  ngOnInit() {
    this.appupdatelist();
  }

  appupdatelist(){
    var Parameter = '{"is_active":0}';
    var Parameter1 = '{"is_active":1}';
    this.getappUpdatelist(Parameter, Parameter1);
  }
  getappUpdatelist(Parameter, Parameter1) {

    this.lastupdate = Parameter;
    this.lastupdate1 = Parameter1;

    console.log(this.lastupdate);
    console.log(this.lastupdate1);

    forkJoin([
      this.dashService._GetAppUpdateDetails(Parameter.toString()),
      this.dashService._GetAppUpdateDetails(Parameter1.toString())]
    ).subscribe(results => {
      var result: any = results[0];
      var result1: any = results[1];
      console.log(result);
      console.log(result1);
      Array.prototype.push.apply(result.data, result1.data);
      this.dataSource = new MatTableDataSource<appUpdateData>(result.data);
      if (this.dataSource) {
        setTimeout(() => this.dataSource.paginator = this.paginator, 100);
        setTimeout(() => this.dataSource.sort = this.sort, 100);
      }
    });
  }

  

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
