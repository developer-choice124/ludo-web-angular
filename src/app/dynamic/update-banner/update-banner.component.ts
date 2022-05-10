import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-update-banner',
  templateUrl: './update-banner.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./update-banner.component.css']
})
export class UpdateBannerComponent implements OnInit {

  @Input() data:any;
  @Output() isClose = new EventEmitter<any>();

  isDropDownExpended:boolean = false;

  constructor() { }

  ngOnInit() {
    console.log(this.data);
  }

  close(){
    this.isClose.emit(true);
  }

  expendDropDown(){
    this.isDropDownExpended = true;
  }

}
