import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private http: HttpClient) {}

  async get(url: string) {
    return new Promise((resolve) => {
      this.http.get(environment.url + url).subscribe(
        (data) => {
          resolve(data);
        },
        (error) => {
          resolve(error);
        }
      );
    });
  }

  post(url: string, body: any): Observable<any> {
    let lUrl = environment.url + url;
    return this.http.post(lUrl, body);
  }

  put(url: string, body: any): Observable<any> {
    let lUrl = environment.url + url;
    return this.http.put(lUrl, body);
  }

  delete(url: string, body: any): Observable<any> {
    let lUrl = environment.url + url;
    return this.http.delete(lUrl, body);
  }
}
