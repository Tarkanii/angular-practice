import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IProduct } from "../types/product";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Api Url
  public apiUrl = 'https://dummyjson.com';

  // Dependancy injection
  constructor(private http: HttpClient) {}

  // Getting products
  public getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.apiUrl}/products`);
  }

  // Adding new product
  public addProduct(name: string): Observable<IProduct> {
    return this.http.post<IProduct>(`${this.apiUrl}/products`, { name });
  }

}