import { HttpClient, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController, AlertController } from 'ionic-angular';
import { Observable } from "rxjs/Rx";
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

/*
  Generated class for the MyproviderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MyproviderProvider {
data;
  constructor(public http: HttpClient,  public loadingCtrl: LoadingController,public alertCtrl : AlertController) {
    console.log('Hello MyproviderProvider Provider');
  }

  getContent(path){
    return this.http.get(window.localStorage.getItem("github")+path) 
    .map(this.extractData).catch(this.handleError);
 }

private extractData(res: any) {
  let body = res;
  return body || { };
}
getUsers(page,path): Observable<string[]> {
  return this.http.get(window.localStorage.getItem("github")+path+"&per_page="+page)
                  .map(this.extractData)
                  .catch(this.handleError);
}

private handleError (error: Response | any) {
  let errMsg: string;
  if (error instanceof Response) {
    const err = error || '';
    errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
  } else {
    errMsg = error.message ? error.message : error.toString();
  }
  console.error(errMsg);
  return Observable.throw(errMsg);
}



  loader:any;
  loadValue="Loading Content..";
  loadingContent(arg){
    this.loader = this.loadingCtrl.create({
      content: this.loadValue,
      spinner: 'dots',
     });
    this.loader.present();
  }


loadingContentHide(){
     this.loader.dismiss();
 }
 
 setValue(val) {
  this.data = val;
}

getValue() {
  return this.data ;
}

public alert(alertTitel,alertSubtitle){
  let alert = this.alertCtrl.create({
   title: alertTitel,
   subTitle: alertSubtitle,
   buttons: ['Ok']
 });
 alert.present()
}
generalSearch(val,type){
  if(type == "success"){
      var searcharr = [];
      if(window.localStorage.getItem("SearchArray").length>1){
          searcharr = JSON.parse(window.localStorage.getItem("SearchArray"));
      }
      searcharr.push({"name":val,"fav":"zno"},);
    //  var searchb = this.uniqBy(searcharr, JSON.stringify)
      window.localStorage.setItem("SearchArray", JSON.stringify(searcharr));
    }
      else{
        var searcharr2 = [];
        if(window.localStorage.getItem("SearchArray_unsuccess").length>1){
            searcharr2 = JSON.parse(window.localStorage.getItem("SearchArray_unsuccess"));
        }
        searcharr2.push(val);
        var searchb2 = this.uniqBy(searcharr2, JSON.stringify)
        window.localStorage.setItem("SearchArray_unsuccess", JSON.stringify(searchb2));
      }
}

uniqBy(a, key) {
  var seen = {};
  return a.filter(function(item) {
                  var k = key(item);
                  return seen.hasOwnProperty(k) ? false : (seen[k] = true);
                  })
}


}
