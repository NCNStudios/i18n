import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  
  translateGateway = 'https://rapid-translate-multi-traduction.p.rapidapi.com/t';
  rapidAPIHost = 'rapid-translate-multi-traduction.p.rapidapi.com';
  rapidAPIKey = 'cd432e305emsh8b2c361a0add996p13f66ejsn464570791b3c';

  constructor(
    private http: HttpClient
  ) {}

  postTranslate(requestBody): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('X-RapidAPI-Host', this.rapidAPIHost);
    headers = headers.append('X-RapidAPI-Key', this.rapidAPIKey);
    return this.http.post(this.translateGateway, requestBody, { headers });
  }
}
