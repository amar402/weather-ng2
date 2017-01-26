import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import 'rxjs/Rx';

import { WeatherService } from '../weather.service';
import { Weather } from '../weather';

@Component({
  selector: 'wp-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  weather:Weather
  title = 'hello'
  constructor(private weatherSer:WeatherService) { }
  weatherClass:Weather;
  location:any = {};
  ngOnInit() {
    this.weatherClass = this.weatherSer.dummyWeather();
    navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
  }

  setPosition(position){
    this.location=position.coords;
    const lat = this.location.latitude.toString();
    const lon = this.location.longitude.toString();
    this.weatherSer.currentLocation(lat, lon).subscribe(
      (data) => {
        this.weatherClass = new Weather(data.name, data.main.temp, data.weather[0].description, data.main.temp_min, data.main.temp_max);
        console.log(data);
      }
    )
  }

  onSubmit(weatherForm: NgForm){
    this.weatherSer.otherWeather(weatherForm.value.city).subscribe(
      (data) => {
        this.weatherClass = new Weather(data.name, data.main.temp, data.weather[0].description, data.main.temp_min, data.main.temp_max);
        console.log(this.weatherClass);
      }
    )
  }
}
