import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SearchhistoryPage } from '../searchhistory/searchhistory';
import { SearchPage } from '../search/search';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
   categories = [{id: 1, name:'New Search', icon:'ios-search', nav:'SearchPage'},{id: 2, name:'Search History', icon:'ios-book', nav:'SearchhistoryPage'}];
   constructor(public navCtrl: NavController) {
    window.localStorage.setItem("github", "https://api.github.com/");
    if (typeof window.localStorage.getItem("SearchArray") == 'undefined' || window.localStorage.getItem("SearchArray") == null)
    this.clearHistory();
  }
  loadContent(c){
    if(c==1)
    this.navCtrl.push(SearchPage);
    else
    this.navCtrl.push(SearchhistoryPage);
  }
  clearHistory(){
    window.localStorage.setItem("SearchArray", "");
    window.localStorage.setItem("SearchArray_unsuccess", "");
  }

}
