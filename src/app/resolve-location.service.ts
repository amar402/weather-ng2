import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { WeatherService } from './weather.service';
import { Weather } from './weather';

@Injectable()
export class ResolveLocationService implements Resolve<any>{
  location;
  weatherClass:Weather;
  constructor(private weatherSer:WeatherService) { };

  resolve(){
    return navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
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
}
