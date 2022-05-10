import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
