import { Component, OnInit, ViewEncapsulation, Inject, AfterViewInit, ViewChild } from '@angular/core';
import { DashboardService } from '@ludo/core/dashboard/dashboard.service';
import { Toaster } from '@ludo/helpers/toast.helper';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle } from '@coreui/coreui/dist/js/coreui-utilities';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog , MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { forkJoin } from 'rxjs';
import { NgxDrpOptions, PresetItem, Range } from 'ngx-mat-daterange-picker';
export interface RoomData {
  _id: any;
  players: any;
  room_coin_id: any;
  coly_room_id: any;
  max_players: any;
  date_created: any;
  coins: any;
  date_modified: any;
  winnerId: any;
}
export interface PlayersData {
  playersdata: any;
  winnerdata: any;
}

const ELEMENT_DATA:RoomData[] = [];
@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['_id' ,'players','coly_room_id','max_players','date_created','coins','date_modified','winnerId','room_coin_id'];
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


  openDialog(data_all,data_winner): void {
    const dialogRef = this.dialog.open(PlayersOverviewDialog, {
      width: '650px',
      data: {playersdata: data_all, winnerdata: data_winner }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      // console.log(result);
      // this.animal = result;
    });
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
    
    var Parameter = '{"max_players":4,"winner_must":true,"first_date":"' + this.range.fromDate + '","last_date":"' + this.range.toDate + '"}';
    var Parameter1 = '{"max_players":3,"winner_must":true,"first_date":"' + this.range.fromDate + '","last_date":"' + this.range.toDate + '"}';
    var Parameter2 = '{"max_players":2,"winner_must":true,"first_date":"' + this.range.fromDate + '","last_date":"' + this.range.toDate + '"}';

    this.getroomdetailslist(Parameter,Parameter1,Parameter2);

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
  getroomdetailslist(Parameter,Parameter1,Parameter2) {

    forkJoin([
      this.dashService._GetRoomDetails(Parameter.toString()),
      this.dashService._GetRoomDetails(Parameter1.toString()),
      this.dashService._GetRoomDetails(Parameter2.toString())]
    ).subscribe(results => {
      // console.log(results);

      var result: any = results[0];
      var result1: any = results[1];
      var resultx2: any = results[2];
      var setres:any=[];
      console.log("=============>");
      resultx2.data.map((element:any) => {
        let setbol:any = false;
        element.players.map((data) => {
          if(data.bot && data.bot == true){
            setbol = true;
          } else {
            if(setbol==true){
              setbol = true;
            } else {
              setbol = false;
            }
          }
        })
        if(setbol==true){
        } else {
          console.log(element);
          setres.push(element);
        }
      });
      var result2: any = {};
      result2.data = setres;
      console.log("=============>");
      
      this.totalMonthDetailsCount = result.data.length + result1.data.length + result2.data.length;
      var dt: number = 0;
      var lt: number = 0;
      Object.keys(result.data).forEach(key => {
        let value = result.data[key];
        dt += value.coins;
        if(value.max_players==4){
          var x = value.coins * 3;
          lt += x;
        } else if(value.max_players==3){
          var x = value.coins * 2;
          lt += x;
        } else if(value.max_players==2){
          lt += value.coins;
        }
      });
      
      var dt1: number = 0;
      var lt1: number = 0;
      Object.keys(result1.data).forEach(key => {
        let value = result1.data[key];
        dt1 += value.coins;
        if(value.max_players==4){
          var x = value.coins * 3;
          lt1 += x;
        } else if(value.max_players==3){
          var x = value.coins * 2;
          lt1 += x;
        } else if(value.max_players==2){
          lt1 += value.coins;
        }
      });
      var dt2: number = 0;
      var lt2: number = 0;
      Object.keys(result2.data).forEach(key => {
        let value = result2.data[key];
        dt2 += value.coins;
        if(value.max_players==4){
          var x = value.coins * 3;
          lt2 += x;
        } else if(value.max_players==3){
          var x = value.coins * 2;
          lt2 += x;
        } else if(value.max_players==2){
          lt2 += value.coins;
        }
      });
      
      Array.prototype.push.apply(result.data,result1.data);
      Array.prototype.push.apply(result.data,result2.data);
      // const newItem = Object.assign({}, result.data, result1.data, result2.data);
      this.dataSource = new MatTableDataSource<RoomData>(result.data);

      if(this.dataSource){

        setTimeout(() => this.dataSource.paginator = this.paginator,1000);
        setTimeout(() => this.dataSource.sort = this.sort,1000);
        // console.log("test");
      }

      this.totalMonthDetailsMoneyWon = dt + dt1 + dt2;
      this.totalMonthDetailsMoneyLost = lt + lt1 + lt2;
      this.twentyyfivpercent = (this.totalMonthDetailsMoneyLost*25)/100;
      this.totalMonthDetailsMoney = this.totalMonthDetailsMoneyWon + this.totalMonthDetailsMoneyLost;

    });

  }

  // lineChart1
  public lineChart1Data: Array<any> = [
    {
      data: [65, 59, 84, 84, 51, 55, 40],
      label: 'Series A'
    }
  ];
  public lineChart1Labels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChart1Options: any = {
    tooltips: {
      enabled: true,
      custom: CustomTooltips
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent'
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        }

      }],
      yAxes: [{
        display: false,
        ticks: {
          display: false,
          min: 40 - 5,
          max: 84 + 5,
        }
      }],
    },
    elements: {
      line: {
        borderWidth: 1
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false
    }
  };
  public lineChart1Colours: Array<any> = [
    {
      backgroundColor: getStyle('--primary'),
      borderColor: 'rgba(255,255,255,.55)'
    }
  ];
  public lineChart1Legend = false;
  public lineChart1Type = 'line';

  // lineChart2
  public lineChart2Data: Array<any> = [
    {
      data: [1, 18, 9, 17, 34, 22, 11],
      label: 'Series A'
    }
  ];
  public lineChart2Labels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChart2Options: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent'
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        }

      }],
      yAxes: [{
        display: false,
        ticks: {
          display: false,
          min: 1 - 5,
          max: 34 + 5,
        }
      }],
    },
    elements: {
      line: {
        tension: 0.00001,
        borderWidth: 1
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false
    }
  };
  public lineChart2Colours: Array<any> = [
    { // grey
      backgroundColor: getStyle('--info'),
      borderColor: 'rgba(255,255,255,.55)'
    }
  ];
  public lineChart2Legend = false;
  public lineChart2Type = 'line';


  // lineChart3
  public lineChart3Data: Array<any> = [
    {
      data: [78, 81, 80, 45, 34, 12, 40],
      label: 'Series A'
    }
  ];
  public lineChart3Labels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChart3Options: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: false
      }],
      yAxes: [{
        display: false
      }]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false
    }
  };
  public lineChart3Colours: Array<any> = [
    {
      backgroundColor: 'rgba(255,255,255,.2)',
      borderColor: 'rgba(255,255,255,.55)',
    }
  ];
  public lineChart3Legend = false;
  public lineChart3Type = 'line';


  // barChart1
  public barChart1Data: Array<any> = [
    {
      data: [78, 81, 80, 45, 34, 12, 40, 78, 81, 80, 45, 34, 12, 40, 12, 40],
      label: 'Series A',
      barPercentage: 0.6,
    }
  ];
  public barChart1Labels: Array<any> = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'];
  public barChart1Options: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: false,
      }],
      yAxes: [{
        display: false
      }]
    },
    legend: {
      display: false
    }
  };
  public barChart1Colours: Array<any> = [
    {
      backgroundColor: 'rgba(255,255,255,.3)',
      borderWidth: 0
    }
  ];
  public barChart1Legend = false;
  public barChart1Type = 'bar';

}


@Component({
  selector: 'players-dialog',
  templateUrl: 'players.dialog.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./analytics.component.scss']
})

export class PlayersOverviewDialog {
  view2:boolean = false;
  view3:boolean = false;
  view4:boolean = false;
  constructor(
    public dialogRef: MatDialogRef<PlayersOverviewDialog>,
    @Inject(MAT_DIALOG_DATA) public data: PlayersData) {

      // console.log("data");
      // console.log();
      // console.log("data");

      if(data.playersdata.length == 2){
        this.view2 = true;
      } else if(data.playersdata.length == 3){
        this.view3 = true;
      }  else if(data.playersdata.length == 4){
        this.view4 = true;
      } 
    }




  onNoClick(): void {
    this.dialogRef.close();
  }

}
