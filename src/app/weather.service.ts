import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { Weather } from './weather';

@Injectable()
export class WeatherService {
  private weather:Weather[] = [] ;
  weatherClass:Weather;
  location;
  constructor(private http:Http) { }

  currentLocation(){
    //create promise to resolve later
    //
    return new Promise((res, rej)=>{
      navigator.geolocation.getCurrentPosition((pos) => {
        this.location = pos.coords;
        const lat = this.location.latitude;
        const lon = this.location.longitude;
        console.log(`lat ${lat} and lon ${lon}`);
        return this.http.get(`http://api.openweathermap.org/data/2.5/weather?appid=0f3fb9fa31ad3d41f1bb2bd0841c3f2f&lat=${lat}&lon=${lon}&units=imperial`).map((response:Response) => response.json()).toPromise().then(
          (data) => {
            this.weatherClass = new Weather(data.name, data.main.temp, data.weather[0].description, data.main.temp_min, data.main.temp_max, data.weather[0].icon);
            res(this.weatherClass);
            return this.weatherClass;
          }
        );
      })
    })

    // return this.weather;
  }

  otherWeather(city:string){
    return this.http.get(`http://api.openweathermap.org/data/2.5/weather?appid=0f3fb9fa31ad3d41f1bb2bd0841c3f2f&q=${city}&units=imperial&cnt=10`).map((response:Response) => response.json());
  }

  otherForecast(city:string){
    return this.http.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city},us&appid=0f3fb9fa31ad3d41f1bb2bd0841c3f2f&units=imperial`).map((response:Response) => response.json())
  }

}
