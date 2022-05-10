import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-footer-old',
  templateUrl: './footer.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  CurrentYear:any;
  constructor() {
    var year = new Date();  
    this.CurrentYear = year.getFullYear();
   }

  ngOnInit() {
  }
}
