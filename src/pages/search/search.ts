import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { MyproviderProvider } from '../../providers/myprovider/myprovider';
import { UserdetailsPage } from '../userdetails/userdetails';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  seachInput;
  searchResult ="";
  historyname;
  flag =false;


data: any;
users: string[];
errorMessage: string;
page = 20;
totalData = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams, public myprovider: MyproviderProvider,public alertCtrl : AlertController) {
  this.historyname =this.navParams.get('historyname'); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
    if(this.historyname)
    this.getUsers(13,this.historyname)
  }
  public alert(alertTitel,alertSubtitle){
    let alert = this.alertCtrl.create({
     title: alertTitel,
     subTitle: alertSubtitle,
     buttons: ['Ok']
   });
   alert.present()
 }

  userDetails(name){
    this.myprovider.loadingContent('');
    this.myprovider.getContent("users/"+name)
    .subscribe(
     searchResult =>{
      this.myprovider.setValue(searchResult);
         this.myprovider.loadingContentHide();  
         this.navCtrl.push(UserdetailsPage);        
      } ,
      error =>  {
          this.myprovider.loadingContentHide();
          this.alert(window.localStorage.getItem("alertTitle"),"error");
          console.log(error);
     })
  }


  getUsers(keyCode,name){
    this.page=20;
    if(keyCode == 13){
      if(name){
        if(name.length>0)
        this.seachInput = name;
      }
      this.myprovider.loadingContent('');
      this.myprovider.getUsers(this.page,"search/users?q="+this.seachInput+"+in%3Alogin")
       .subscribe(
        res => {
          this.myprovider.loadingContentHide();
           this.data  = res; 
           if(this.data.total_count>0){   
           this.users = this.data.items;
           this.flag=true; 
           this.totalData =this.data.total_count;
           this.myprovider.generalSearch(this.seachInput,"success");
           }
           else{
            this.flag =false;
            this.myprovider.generalSearch(this.seachInput,"unsuccess");
            this.alert(window.localStorage.getItem("alertTitle"),"Please check the userName");
           }
         },
        error =>  {
            this.myprovider.loadingContentHide();
            this.alert(window.localStorage.getItem("alertTitle"),"error");
            console.log(error);
       })
      }
      
  }

  doInfinite(infiniteScroll) {
    this.page = this.page+20;
    setTimeout(() => {
      this.myprovider.getUsers(this.page,"search/users?q="+this.seachInput+"+in%3Alogin")
         .subscribe(
           res => {
             this.data = res;
             this.myprovider.loadingContentHide();
             this.data  = res; 
             if(this.data.total_count>0){   
             this.users = this.data.items;
             this.flag=true; 
             this.totalData =this.data.total_count;
             }
             else{
              this.flag =false;
              this.alert(window.localStorage.getItem("alertTitle"),"Please check the userName");
             }
             let len =this.data.items.length;
             this.users =[];
             for(let i=0; i<len; i++) {
               this.users.push(this.data.items[i]);
             }
           },
           error =>  {
               this.myprovider.loadingContentHide();
               this.alert(window.localStorage.getItem("alertTitle"),"Something went wrong !");
               console.log(error);
          })
  
      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 1000);
  }

}
