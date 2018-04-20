import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState, Friend_List, Friend } from '../../app/model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @select(['friend_list', 'friends'])
  readonly friends: Observable<Friend[]>;

  @select(['friend_list', 'loading'])
  readonly loading$: Observable<boolean>;

  @select(['friend_list', 'error'])
  readonly error$: Observable<string>;

  constructor(public navCtrl: NavController,public ngRedux:NgRedux<IAppState>) {
      console.log(this.something());
      // this.ngRedux.dispatch({
      //   type: "LOAD_FRIENDS"
      // });
  }

  fetchDet(){
    this.ngRedux.dispatch({
      type: "LOAD_FRIENDS"
    });
  }

 something(){
        return {
          friends: [{"id":1,"name":"Biswanath sarkar","conntectd":true},{"id":2,"name":"Kamal das","conntectd":false},{"id":3,"name":"Naman ojha","conntectd":false}],
          loading: true,
          error: null,
        };
  
  }


}
