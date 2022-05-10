import { Component, OnInit, ViewEncapsulation, Inject, AfterViewInit, ViewChild } from '@angular/core';
import { DashboardService } from '@ludo/core/dashboard/dashboard.service';
import { Toaster } from '@ludo/helpers/toast.helper';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog , MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { forkJoin } from 'rxjs';
import { NgxDrpOptions, PresetItem, Range } from 'ngx-mat-daterange-picker';
export interface ReferData {
  _id: any;
  req_phone: any;
  reqid: any;
  req_to_phone: any;
  is_active: any;
  created_on: any;
  updated_on: any;
}
export interface PlayersData {
  playersdata: any;
  winnerdata: any;
}


const ELEMENT_DATA:ReferData[] = [];
@Component({
  selector: 'app-referred',
  templateUrl: './referred.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./referred.component.scss']
})
export class ReferredComponent implements OnInit {


  displayedColumns: string[] = ['req_phone','reqid','req_to_phone','is_active','created_on','updated_on','_id'];
  // displayedColumns: string[] = ['_id' ,'req_phone','reqid','req_to_phone','is_active','created_on','updated_on'];
  // dataSource: MatTableDataSource<RoomData>;
  dataSource = new MatTableDataSource<ReferData>(ELEMENT_DATA);
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
  totalMonthDetailsCount: number = 0;
  totalMonthDetailsMoney: number = 0;
  totalMonthDetailsMoneyLost:number = 0;
  totalMonthDetailsMoneyWon:number = 0;
  twentyyfivpercent:number = 0;
  t4: number = 0;
  t2: number = 0;
  d2: number = 0;
  d4: number = 0;
  firstDay: Date;
  today_date: Date;
  setIndex: number;

  animal: string;
  name: string;

  range:Range = {fromDate:new Date(), toDate: new Date()};
  options:NgxDrpOptions;
  presets:Array<PresetItem> = [];

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
    const fromMin = new Date(today.getFullYear(), today.getMonth()-2, 1);
    const fromMax = new Date(today.getFullYear(), today.getMonth()+1, 0);
    const toMin = new Date(today.getFullYear(), today.getMonth()-1, 1);
    const toMax = new Date(today.getFullYear(), today.getMonth()+2, 0);
 
    this.setupPresets();
    this.options = {
                    presets: this.presets,
                    format: 'mediumDate',
                    range: {fromDate:this.firstDay, toDate: today},
                    applyLabel: "Submit",
                    calendarOverlayConfig: {
                      shouldCloseOnBackdropClick: false
                    }
                    // cancelLabel: "Cancel",
                    // excludeWeekends:true,
                    // fromMinMax: {fromDate:fromMin, toDate:fromMax},
                    // toMinMax: {fromDate:toMin, toDate:toMax}
                  };
  }

  // handler function that receives the updated date range object
  updateRange(range: Range){
    this.range = range;
    // console.log(this.range);
    
    var Parameter = '{"is_active":0,"payment_status":true,"first_date":"' + this.range.fromDate + '","last_date":"' + this.range.toDate + '"}';
    var Parameter1 = '{"is_active":1,"payment_status":false,"first_date":"' + this.range.fromDate + '","last_date":"' + this.range.toDate + '"}';

    this.getroomdetailslist(Parameter,Parameter1);

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
    const currMonthEnd = new Date(today.getFullYear(), today.getMonth()+1, 0);
    const lastMonthStart = new Date(today.getFullYear(), today.getMonth()-1, 1);
    const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);
    
    this.presets =  [
      {presetLabel: "Yesterday", range:{ fromDate:yesterday, toDate:today }},
      {presetLabel: "Last 7 Days", range:{ fromDate: minus7, toDate:today }},
      {presetLabel: "Last 30 Days", range:{ fromDate: minus30, toDate:today }},
      {presetLabel: "This Month", range:{ fromDate: currMonthStart, toDate:currMonthEnd }},
      {presetLabel: "Last Month", range:{ fromDate: lastMonthStart, toDate:lastMonthEnd }}
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
  getroomdetailslist(Parameter,Parameter1) {
    console.log(Parameter);
    console.log(Parameter1);
    forkJoin([
      this.dashService._GetReferDetails(Parameter.toString()),
      this.dashService._GetReferDetails(Parameter1.toString())]
    ).subscribe(results => {
      // console.log(results);
      var result: any = results[0];
      var result1: any = results[1];
      Array.prototype.push.apply(result.data,result1.data);
      this.dataSource = new MatTableDataSource<ReferData>(result.data);

      if(this.dataSource){

        setTimeout(() => this.dataSource.paginator = this.paginator,1000);
        setTimeout(() => this.dataSource.sort = this.sort,1000);
        // console.log("test");
      }
    });

  }
}
