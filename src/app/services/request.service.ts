import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private http: HttpClient) {}

  get(url: string, body: any = {}): Observable<any> {
    let lUrl = environment.url + url;
    return this.http.get(lUrl, body);
  }

  post(url: string, body: any): Observable<any> {
    let lUrl = environment.url + url;
    return this.http.post(lUrl, body);
  }
}
