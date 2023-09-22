import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_REST: string = 'http://localhost:8080/wicket';

  constructor(private http: HttpClient) { }

  public login(username: string, password: string) {
    const headers = new HttpHeaders({ Authorization: 'Basic' + btoa(username + ":" + password) })

    return this.http.get(this.API_REST, { headers, responseType: 'text' as 'json' });
  }


  public getUser(username:any , password:any) {
    const url = `${this.API_REST}/signin`
    // let username = "sven";
    // let password = "pass";

    const headers = new HttpHeaders({ Authorization: 'Basic' + btoa(username + ":" + password) })

    return this.http.get(url, { headers, responseType: 'text' as 'json' })
  }


}

