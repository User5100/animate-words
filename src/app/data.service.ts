import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

const BASE_URL = `http://localhost:3000/data`;

@Injectable()
export class DataService {

  constructor(private http: Http) { }

  getData() {
    return this.http.get(BASE_URL)
                    .map(res => res.json())
                    .switchMap(data => {

                      let words = [];

                      data.srts.map(segment => {
                        words = [...words, ...segment.words]
                      })

                      return Observable.of(words);
                    })

  }

}
