import { Injectable } from '@angular/core';

@Injectable()
export class WeatherService {
  constructor() { }

  getWeather(coord){
    const lat = coord.latitude;
    const long = coord.longitude;
  }

  currentLocation(){
    navigator.geolocation.getCurrentPosition((pos) => {
      return this.getWeather(pos.coords)
    });
  }
}
