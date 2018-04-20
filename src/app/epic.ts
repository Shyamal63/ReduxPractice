import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class FriendEpic {
  constructor(private http: Http) {}
  getFriendList = (action$: ActionsObservable<any>) =>{
    return action$.ofType("LOAD_FRIENDS")
      .mergeMap(({payload}) => {
        return this.http.get("http://www.mocky.io/v2/5ad987952f00005400cfdd82?mocky-delay=2000ms")
          .map(result => ({
            type: "LOAD_COMPLETE",
            payload: result.json()
          }))
          .catch(error => Observable.of({
            type: "LOAD_FAILED",
            error: "Fetching Failed"
          }));
        });
  }
}
