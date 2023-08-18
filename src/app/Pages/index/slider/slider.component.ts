import { Component, OnInit } from '@angular/core';
import { Slider } from 'src/app/DTOs/Sliders/Slider';
import { SliderService } from 'src/app/Services/slider.service';
import { DomainName } from 'src/Utilities/PathTools';

declare function homeSlider():any;
  

@Component({
  selector: 'app-index-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  public sliders:Slider[]=[];
  public domain:string=DomainName;
  /**
   *
   */
  constructor(private sliderService: SliderService) {

  }

  ngOnInit():void{

this.sliderService.getCurrentSliders().subscribe(sliders=>{
  if(sliders===null){
    this.sliderService.GetSliders().subscribe(sliders=>{
      if(sliders.statusCode==="Success"){
        this.sliderService.setCurrentSliders(sliders.data);
      }
    });
  }else{
    this.sliders=sliders;
    setInterval(()=>{
      homeSlider();
    },100);
  }

});
  }

}
