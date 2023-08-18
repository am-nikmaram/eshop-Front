import { Slider } from "./Slider";

export interface HomeSliderResponse{
    statusCode:string,
    message:string,
    isSuccess:boolean,
    data:Slider[]
}