import { Component, OnInit, ViewEncapsulation, Inject, AfterViewInit, ViewChild } from '@angular/core';
import { DashboardService } from '@ludo/core/dashboard/dashboard.service';
import { Toaster } from '@ludo/helpers/toast.helper';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle } from '@coreui/coreui/dist/js/coreui-utilities';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { forkJoin } from 'rxjs';
import { NgxDrpOptions, PresetItem, Range } from 'ngx-mat-daterange-picker';
export interface RoomData {
  _id: any;
  _userId: any;
  phone: any;
  redeemcoins: any;
  created_on: any;
  paynumber: any;
  paytype:any;
  payupiid:any;
  account:any;
  is_active: any;
  updated_on: any;
  reason:any;
  paytm_ref_id:any;
  name_of_payer:any;
}
export interface RedeemData {
  name_of_payer: any;
  paytm_ref_id: any;
  _id: any;
}


const ELEMENT_DATA: RoomData[] = [];
@Component({
  selector: 'app-redeem',
  templateUrl: './redeem.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./redeem.component.scss']
})
export class RedeemComponent implements OnInit {

  displayedColumns: string[] = [ 'phone', 'redeemcoins', 'created_on', 'paynumber', 'paytype', 'payupiid', 'account', 'is_active', 'updated_on', 'name_of_payer', 'paytm_ref_id' ,'reason','_id', '_userId'];
  // dataSource: MatTableDataSource<RoomData>;
  dataSource = new MatTableDataSource<RoomData>(ELEMENT_DATA);
  roomIdofRoom: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('dateRangePicker') dateRangePicker;
  message: string;
  messages: string[] = [];
  refreshdata: any;
  roomsCount: number = 0;
  roomslist: boolean = true;
  roomlistshow: boolean = false;
  roomDeleteButton: boolean = false;
  twentyyfivpercent: number = 0;
  firstDay: Date;
  today_date: Date;
  setIndex: number;
  lastupdate: any;
  lastupdate1: any;
  animal: string;
  name: string;
  datavalue: any;

  range: Range = { fromDate: new Date(), toDate: new Date() };
  options: NgxDrpOptions;
  presets: Array<PresetItem> = [];

  constructor(
    public dialog: MatDialog,
    private _toaster: Toaster,
    private dashService: DashboardService
  ) {
    this.today_date = new Date();
    this.firstDay = new Date(this.today_date.getFullYear(), this.today_date.getMonth(), 1);
  }
  ngOnInit() {
    const today = new Date();
    const fromMin = new Date(today.getFullYear(), today.getMonth() - 2, 1);
    const fromMax = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const toMin = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const toMax = new Date(today.getFullYear(), today.getMonth() + 2, 0);
    this.setupPresets();
    this.options = {
      presets: this.presets,
      format: 'mediumDate',
      range: { fromDate: this.firstDay, toDate: today },
      applyLabel: "Submit",
      calendarOverlayConfig: {
        shouldCloseOnBackdropClick: false
      }
    };
  }
  openDialog(data, redeemcheck): void {
    const dialogRef = this.dialog.open(RedeemOverviewDialog, {
      width: '650px',
      disableClose: true,
      data: { redeemdata: data }
    });

    dialogRef.afterClosed().subscribe((data: any) => {
      var redeemcheakset: any = JSON.parse(localStorage.getItem('redeemdatavalue'));

      if (redeemcheck == 'paid' && redeemcheakset == true) {
        var redeemdata: any = JSON.parse(localStorage.getItem('redeemdata'));
        localStorage.setItem('redeemdatavalue', 'false');
        this.UpdatePaidDate(redeemdata);
      } else if (redeemcheck == 'update' && redeemcheakset == true) {
        var redeemdata: any = JSON.parse(localStorage.getItem('redeemdata'));
        localStorage.setItem('redeemdatavalue', 'false');
        this.UpdatePaidDateBack(redeemdata);
      }
    });
  }

  // handler function that receives the updated date range object
  updateRange(range: Range) {
    this.range = range;
    // console.log(this.range);

    var Parameter = '{"is_active":0,"first_date":"' + this.range.fromDate + '","last_date":"' + this.range.toDate + '"}';
    var Parameter1 = '{"is_active":1,"first_date":"' + this.range.fromDate + '","last_date":"' + this.range.toDate + '"}';
    this.getredeemdetailslist(Parameter, Parameter1);

  }
  async UpdatePaidDate(value) {
    // console.log(data);
    var body = { "_id": value.redeemdata, "is_active": 1, "name_of_payer": value.name_of_payer, "paytm_ref_id": value.paytm_ref_id };
    await (await this.dashService.postRedeemUpdateCoins(body)).subscribe(
      res => {
        var result: any = res;
        // console.log(result);
        if (result.data.result.nModified == 1) {
          this._toaster.success('Success!', ` Update was Successful.`);
          this.getredeemdetailslist(this.lastupdate, this.lastupdate1);
        }
      },
      err => { this._toaster.error('Failure!', ` Issue: ` + err.error.error); },
      () => ''
    );
  }
  async UpdatePaidDateBack(value) {
    // console.log(data);
    var body = { "_id": value.redeemdata, "is_active": 0, "name_of_payer": value.name_of_payer, "reason": value.paytm_ref_id };
    await (await this.dashService.postRedeemUpdateCoins(body)).subscribe(
      res => {
        var result: any = res;
        // console.log(result);
        if (result.data.result.nModified == 1) {
          this._toaster.success('Success!', ` Update was Successful.`);
          this.getredeemdetailslist(this.lastupdate, this.lastupdate1);
        }
      },
      err => { this._toaster.error('Failure!', ` Issue: ` + err.error.error); },
      () => ''
    );
  }
  // helper function to create initial presets
  setupPresets() {

    const backDate = (numOfDays) => {
      const today = new Date();
      return new Date(today.setDate(today.getDate() - numOfDays));
    }

    const today = new Date();
    const yesterday = backDate(1);
    const minus7 = backDate(7)
    const minus30 = backDate(30);
    const currMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const currMonthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);

    this.presets = [
      { presetLabel: "Yesterday", range: { fromDate: yesterday, toDate: today } },
      { presetLabel: "Last 7 Days", range: { fromDate: minus7, toDate: today } },
      { presetLabel: "Last 30 Days", range: { fromDate: minus30, toDate: today } },
      { presetLabel: "This Month", range: { fromDate: currMonthStart, toDate: currMonthEnd } },
      { presetLabel: "Last Month", range: { fromDate: lastMonthStart, toDate: lastMonthEnd } }
    ]
  }

  ngAfterViewInit() {
    setTimeout(() => this.dataSource.paginator = this.paginator);
    setTimeout(() => this.dataSource.sort = this.sort);
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getredeemdetailslist(Parameter, Parameter1) {

    this.lastupdate = Parameter;
    this.lastupdate1 = Parameter1;
    forkJoin([
      this.dashService._GetRedeemDetails(Parameter.toString()),
      this.dashService._GetRedeemDetails(Parameter1.toString())]
    ).subscribe(results => {
      // console.log(results);

      var result: any = results[0];
      var result1: any = results[1];

      Array.prototype.push.apply(result.data, result1.data);
      this.dataSource = new MatTableDataSource<RoomData>(result.data);
      if (this.dataSource) {
        setTimeout(() => this.dataSource.paginator = this.paginator, 100);
        setTimeout(() => this.dataSource.sort = this.sort, 100);
      }
    });
  }
}

@Component({
  selector: 'redeem-dialog',
  templateUrl: 'redeem.dialog.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./redeem.component.scss']
})

export class RedeemOverviewDialog implements OnInit {
  public formRedeemGroup: FormGroup;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<RedeemOverviewDialog>,
    @Inject(MAT_DIALOG_DATA) public data: RedeemData) {
  }

  ngOnInit() {
    this.formRedeemGroup = this.formBuilder.group({
      name: ['', Validators.required],
      // refid: ['',[Validators.required, Validators.minLength(6),Validators.maxLength(6)]]
      refid: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  get f() { return this.formRedeemGroup.controls; }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onReset() {
    this.submitted = false;
    this.formRedeemGroup.reset();
  }

  onSubmit() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.formRedeemGroup.invalid) {
      return;
    }
    this.data.name_of_payer = this.formRedeemGroup.value.name;
    this.data.paytm_ref_id = this.formRedeemGroup.value.refid;

    localStorage.setItem('redeemdata', JSON.stringify(this.data));
    localStorage.setItem('redeemdatavalue', 'true');
    // console.log(this.data);
    this.dialogRef.close();
    // const mergeddata = Object.assign(this.formRedeemGroup.value);

  }

}
