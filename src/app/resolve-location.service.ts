import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import 'rxjs/Rx';

import { WeatherService } from './weather.service';
import { Weather } from './weather';

@Injectable()
export class ResolveLocationService implements Resolve<any>{
  location;
  weatherClass:Weather;
  constructor(private weatherSer:WeatherService) { };

  resolve(){
    return this.weatherSer.currentLocation();
  }

  // resolve(){
  //   return this.weatherSer.otherWeather('Provo')
  // }

}
