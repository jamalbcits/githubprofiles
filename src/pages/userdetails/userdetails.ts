import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyproviderProvider } from '../../providers/myprovider/myprovider';
import { ImageViewerController } from 'ionic-img-viewer';

/**
 * Generated class for the UserdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-userdetails',
  templateUrl: 'userdetails.html',
})
export class UserdetailsPage {
userInfo;
name;img;company;blog;email;created_at;updated_at;subscriptions_url;login;
filterChecked;
filterCheckedData=[];
showHideContentName="";
showHideContentTemp="";
favourites;
isFav;
filterData=[
  {name:"Rating",id:1,data:[
  {name:".",id:1}
  ]},
  {name:"Followers",id:2,data:[
  {name:"folling-1",id:1},
  {name:"following 2",id:2}
  ]},
  {name:"Following",id:4,data:[
  {name:"follower-1",id:1},
  {name:"follower-2",id:2}
  ]}
  ];
  constructor(public navCtrl: NavController, public navParams: NavParams,public _imageViewerCtrl: ImageViewerController, public myprovider: MyproviderProvider) {
    this.userInfo =this.myprovider.getValue();
    this.name =this.userInfo.name;
    this.img =this.userInfo.avatar_url;
    this.company =this.userInfo.company;
    this.blog=this.userInfo.blog;
    this.email=this.userInfo.email;
    this.created_at=this.userInfo.created_at;
    this.updated_at=this.userInfo.updated_at;
    this.subscriptions_url=this.userInfo.subscriptions_url;
    this.login=this.userInfo.login;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad UserdetailsPage');
    this.favourites = JSON.parse(window.localStorage.getItem("SearchArray"));
    if(window.localStorage.getItem("SearchArray")){
      for(let i=0;i<this.favourites.length;i++){
        if(this.favourites[i].name == this.login && this.favourites[i].fav == 'yes'){
          console.log("seems like favourite");
          this.isFav =true;
          return false;
        }
        else{
          this.isFav =false;
        }
      }
    //  console.log("favourite");
    }
  }
  showHideContent(data){
    if(data.name == this.showHideContentTemp){
      this.showHideContentName="";
      this.showHideContentTemp="";
    }
    else{
      this.showHideContentName=data.name;
      this.showHideContentTemp=data.name;
    }
  }
  presentImage(myImage) {
    const imageViewer = this._imageViewerCtrl.create(myImage);
    imageViewer.present();

    setTimeout(() => imageViewer.dismiss(), 30000);
    imageViewer.onDidDismiss(() => alert('Viewer dismissed'));
  }

 

}
