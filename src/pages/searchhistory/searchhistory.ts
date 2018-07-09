import { Component, ViewChild ,Pipe, PipeTransform} from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SearchPage } from '../search/search';
import { MyproviderProvider } from '../../providers/myprovider/myprovider';

/**
 * Generated class for the SearchhistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-searchhistory',
  templateUrl: 'searchhistory.html',
})
export class SearchhistoryPage {
items;
items_unsuccess;
items_fav;
type;

@ViewChild(Navbar) navBar: Navbar;
  constructor(public navCtrl: NavController, public navParams: NavParams,public myprovider : MyproviderProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchhistoryPage');
    if(window.localStorage.getItem("SearchArray"))
    this.items = JSON.parse(window.localStorage.getItem("SearchArray"));
    if(window.localStorage.getItem("SearchArray_unsuccess"))
    this.items_unsuccess = JSON.parse(window.localStorage.getItem("SearchArray_unsuccess"));
    console.log(this.items);
    this.navBar.backButtonClick = () => {
        let pages = [{page: HomePage}
	    ];
	    this.navCtrl.setPages(pages);}
  }
  getUsers(name){
   this.navCtrl.push(SearchPage,{historyname:name})
  }
  clearHistory(){
    window.localStorage.setItem("SearchArray", "");
    window.localStorage.setItem("SearchArray_unsuccess", "");
    window.localStorage.setItem("fav", "");
    this.navCtrl.push(this.navCtrl.getActive().component);
  }
  handleOverslide(item){
    console.log(item);
  }
  favorite(item){
   this.items.forEach(o => {
    for(let k in o)
      if(o.name == item){
        o.fav = "yes";
      }
   });
   window.localStorage.setItem("SearchArray", JSON.stringify(this.items));
   // this.navCtrl.push(this.navCtrl.getActive().component);
  }
  unfavorite(item){
    this.items.forEach(o => {
     for(let k in o)
       if(o.name == item){
         o.fav = "zno";
       }
    });
    window.localStorage.setItem("SearchArray", JSON.stringify(this.items));
   //  this.navCtrl.push(this.navCtrl.getActive().component);
   }

}
