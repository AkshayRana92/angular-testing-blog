import {Headers, Http} from '@angular/http';
import {Injectable, Inject} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class AppService {
  private userDataURL: string;

  constructor(private http: Http) {
    this.userDataURL = 'https://jsonplaceholder.typicode.com/users'
  }

  getData(): Observable<any> {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http
      .get(this.userDataURL, {headers: headers})
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: any) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: any) {
    let errMsg: string;
    try {
      if(JSON.parse(error._body)) {
        errMsg = JSON.parse(error._body);
      } else {
        errMsg = 'Something went wrong. Please try again later.';
      }
    } catch(e){
      errMsg = 'Something went wrong. Please try again later.';
    }
    return Observable.throw(new Error(errMsg));
  }

}
