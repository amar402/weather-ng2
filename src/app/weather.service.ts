import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { Weather } from './weather';

@Injectable()
export class WeatherService {
  private weather:Weather = new Weather('Provo', '100', 'sunny', '50', '200', '1:20', '5:20') ;
  constructor(private http:Http) { }

  currentLocation(lat:string, lon:string){
    return this.http.get(`http://api.openweathermap.org/data/2.5/weather?appid=0f3fb9fa31ad3d41f1bb2bd0841c3f2f&lat=${lat}&lon=${lon}&units=imperial`).map((response:Response) => response.json());

    // return this.weather;
  }

  otherWeather(city:string){
    return this.http.get(`http://api.openweathermap.org/data/2.5/weather?appid=0f3fb9fa31ad3d41f1bb2bd0841c3f2f&q=${city}&units=imperial`).map((response:Response) => response.json());
  }

  dummyWeather(){
    return this.weather;
  }
}
