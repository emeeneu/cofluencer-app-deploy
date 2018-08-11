import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
// import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment.prod';

@Injectable()
export class IgDatauserService {
  instaUser: Object;

  constructor(private http: Http) { }
  private API_URL = environment.apiUrl;

  getInfoInstaUser(){
    // return this.http.get('http://localhost:3000/api/ig/emeeneu')
    //   .map((res: Response) => res.json());
  }
}
