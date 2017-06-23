import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

const BASE_URL = `http://localhost:3000/data`;
                  

@Injectable()
export class DataService {

  constructor(private http: Http) { }

  getData() {
    return this.http.get(BASE_URL)
                    .map(res => res.json())
  }

}
