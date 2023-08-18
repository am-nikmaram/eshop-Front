import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HomeSliderResponse } from '../DTOs/Sliders/HomeSliderResponse';
import { Slider } from '../DTOs/Sliders/Slider';

@Injectable({
  providedIn: 'root'
})
export class SliderService {

  private homeSliders:BehaviorSubject<Slider[]|null>=new BehaviorSubject<Slider[]|null>(null);

  constructor( private http : HttpClient) {

   }

  public GetSliders():Observable<HomeSliderResponse>{
return this.http.get<HomeSliderResponse>("/api/v1/slider/getactivesliders");
  }
  
  public getCurrentSliders():Observable<Slider[]|null>{
    return this.homeSliders;
  }

  public setCurrentSliders(sliders:Slider[]){
    this.homeSliders.next(sliders);
  }
}
