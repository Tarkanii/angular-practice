import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  // Return range between start(param) and end(param) 
  public range(start: number, end: number): number[] {
    return [...Array(end - start).keys()].map((el: number) => el + start);
  }
  
  // Return array of field values from provided array of objects
  public pluck<T>(arr: T[], field: keyof T): T[keyof T][] {
    return arr.map((el: T) => el[field]);
  }
}