import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}
  public get<T>(url: string, options?: { headers: HttpHeaders }) {
    return this.http.get<T>(url, options);
  }

  public post<T>(url: string, data: any, options?: { headers: HttpHeaders }) {
    return this.http.post<T>(url, data, options);
  }

  public put<T>(url: string, data: any, options?: { headers: HttpHeaders }) {
    return this.http.put<T>(url, data, options);
  }

  public delete(url: string, options?: { headers: HttpHeaders }) {
    return this.http.delete(url, options);
  }
}
