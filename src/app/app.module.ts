import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SearchhistoryPage } from '../pages/searchhistory/searchhistory';
import { SearchPage } from '../pages/search/search';
import { MyproviderProvider } from '../providers/myprovider/myprovider';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http'; 
import { UserdetailsPage } from '../pages/userdetails/userdetails';
import { OverslideDirective } from '../directives/overslide/overslide';
import { ArraySortPipe } from '../pipes/array-sort/array-sort';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SearchhistoryPage,
    SearchPage,
    UserdetailsPage,
    OverslideDirective,
    ArraySortPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicImageViewerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SearchhistoryPage,
    SearchPage,
    UserdetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MyproviderProvider
  ]
})
export class AppModule {}
