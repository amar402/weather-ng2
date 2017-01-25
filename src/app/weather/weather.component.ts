import { Component, OnInit } from '@angular/core';

import { WeatherService } from '../weather.service';

@Component({
  selector: 'wp-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  pos:any;
  constructor(private weatherSer:WeatherService) { }

  ngOnInit() {
    console.log(this.pos.weatherSer.currentLocation())
  }

}
