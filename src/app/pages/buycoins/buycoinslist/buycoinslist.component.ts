import { Component, OnInit, ViewChild, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Toaster } from '@ludo/helpers/toast.helper';
import { ConfirmDialogModel, ConfirmDialogComponent } from '@ludo/core/dialog/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';
import { BuycoinsService } from '@ludo/core/buycoins/buycoins.service';
export interface CoinData {
  _id: string;
  coins: number;
  price: number;
  is_active: number;
}
@Component({
  selector: 'app-buycoinslist',
  templateUrl: './buycoinslist.component.html',
  styleUrls: ['./buycoinslist.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BuycoinslistComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['_id', 'coins', 'price', 'action'];
  dataSource: MatTableDataSource<CoinData>;
  DATAY: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  setIndex:number;
  constructor(
    private _buyService: BuycoinsService,
    private _toaster: Toaster,
    public dialog: MatDialog,
  ) {
    this.getBuyService();

  }
  async getBuyService() {
    await (await this._buyService.getBuyCoins()).subscribe(
      res => {
        var result: any = res;
        this.dataSource = new MatTableDataSource(result.data);
        setTimeout(() => this.dataSource.paginator = this.paginator);
        setTimeout(() => this.dataSource.sort = this.sort);
        console.log(this.dataSource);
        // this._toaster.success('Success!', ` Password Reset : ` + result.data);
      },
      err => { this._toaster.error('Failure!', ` Issue: ` + err.error.error); },
      () => console.log('HTTP request completed.')
    );
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
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
