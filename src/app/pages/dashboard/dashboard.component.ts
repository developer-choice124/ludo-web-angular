import { Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChild } from '@angular/core';
import { DashboardService } from '@ludo/core/dashboard/dashboard.service';
import { Toaster } from '@ludo/helpers/toast.helper';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { ConfirmDialogModel, ConfirmDialogComponent } from '@ludo/core/dialog/confirm-dialog/confirm-dialog.component';
import { BuycoinsService } from '@ludo/core/buycoins/buycoins.service';
export interface RoomData {
  clients: any;
  createdAt: any;
  elapsedTime: any;
  locked: any;
  maxClients: any;
  name: any;
  private: any;
  processId: any;
  roomId: any;
}
export interface PlayersData {
  sessionId: any;
  roomIdofRoom: any;
  // action:any;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
 
  displayedColumns: string[] = ['roomId', 'private', 'name', 'maxClients', 'locked', 'elapsedTime', 'createdAt', 'clients', 'processId'];
  dataSource: MatTableDataSource<RoomData>;
  roomIdofRoom: any;
  // displayedColumns2: string[] = ['sessionId','roomIdofRoom','action'];
  displayedColumns2: string[] = ['roomIdofRoom', 'sessionId'];
  dataSource2: MatTableDataSource<PlayersData>;
  DATAY: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  message: string;
  messages: string[] = [];
  refreshdata: any = { "rooms": [{ "clients": 3, "createdAt": "2020-02-01T07:43:25.454Z", "maxClients": 3, "name": "game_room", "processId": "O-hDNm0y9", "roomId": "IlgM73d-y", "locked": true, "private": false, "elapsedTime": 521871 }, { "clients": 1, "createdAt": "2020-02-01T07:43:44.458Z", "maxClients": 3, "name": "game_room", "processId": "O-hDNm0y9", "roomId": "SEr8qp9Kw", "locked": false, "private": false, "elapsedTime": 502867 }], "connections": 4, "cpu": 16.42, "memory": { "totalMemMb": 5.88, "usedMemMb": 4.93 } };
  roomsCount: number = 0;
  roomslist: boolean = true;
  roomlistshow: boolean = false;
  roomDeleteButton: boolean = false;


  setIndex: number;
  constructor(
    private _buyService: BuycoinsService,
    public dialog: MatDialog,
    private _toaster: Toaster,
    private dashService: DashboardService
  ) {

  }

  async commomMethod(roomId, method, sesId:string=null) {
    // console.log(method);
    
    var args:any = [];
    if(sesId){
      args.push(sesId)
    }

    // _sendMessageToClient
    // _forceClientDisconnect
    // disconnect

    await (await this.dashService.remoteRoomCall(roomId, method, JSON.stringify(args))).subscribe(
      res => {
        var result: any = res;
          if(method=='_forceClientDisconnect'){
            this.roomdetails(roomId);
            this._toaster.success('Success!', ` Player Deleted with ID : ` + sesId);
          } else if(method=='disconnect'){
            this._toaster.success('Success!', ` Room Deleted with ID : ` + roomId);
          } else if(method=='_sendMessageToClient'){
            this._toaster.success('Success!', ` Message Send to the User with Session ID : ` + sesId);
          }
      },
      err => { this._toaster.error('Failure!', ` Issue: ` + err.error.error); },
      () => console.log('HTTP request completed.')
    );
  }

  

  setDeleteTrue() {
    if (this.roomDeleteButton) {
      this.roomDeleteButton = false;
    } else {
      this.roomDeleteButton = true;
    }
  }
  dist_fun(data) {
    var sec = data / 1000;
    var min = sec / 60;
    var hr = min / 60;
    // console.log(hr+'-'+min+'-'+sec);
  }
  bacttoroomlist() {
    this.roomslist = true;
    this.roomlistshow = false;
  }

  async roomdetails(roomId) {
    this.roomIdofRoom = roomId;

    await (await this.dashService.getRoomDetails(roomId)).subscribe(
      res => {
        var result: any = res;
        if (result) {
          this.dataSource2 = new MatTableDataSource<PlayersData>(result.clients);
          setTimeout(() => this.dataSource2.paginator = this.paginator);
          setTimeout(() => this.dataSource2.sort = this.sort);
          this.roomslist = false;
          this.roomlistshow = true;
        }
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
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ngOnInit() {
    this.loadRoomList();
  }

  loadRoomList() {
    setTimeout(() => {
      this.getroomlist();
    }, 100)
  }
  async getroomlist() {
    await (await this.dashService.getRoomList()).subscribe(
      res => {
        var result: any = res;
        // console.log(result);
        this.refreshdata = result;
        this.roomsCount = this.refreshdata.rooms.length;
        this.dataSource = new MatTableDataSource<RoomData>(result.rooms);
        setTimeout(() => this.dataSource.paginator = this.paginator);
        setTimeout(() => this.dataSource.sort = this.sort);
        this.loadRoomList();
      },
      err => { this._toaster.error('Failure!', ` Issue: ` + err.error.error); },
      () => ''
    );
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






























// import { Component, OnInit } from '@angular/core';
// import { SocketIOService } from '@ludo/helpers/socketIO.helper';

// @Component({
//   selector: 'app-dashboard',
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.scss']
// })
// export class DashboardComponent implements OnInit {
//   message: string;
//   messages: string[] = [];

//   constructor(
//     private SocketService: SocketIOService
//     ) {}
//     ngOnInit() {
//       this.SocketService
//       .getMessages('game_room')
//       .subscribe((message: string) => {
//         this.messages.push(message);
//       });
//     }
//     sendMessage() {
//       this.SocketService.sendMessage(this.message);
//       this.message = '';
//     }

// }
