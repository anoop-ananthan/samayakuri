import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppVersion } from '@ionic-native/app-version';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  private appName: string;
  private packageName: string;
  private versionCode: string;
  private versionNumber: string;

  constructor(
    public navCtrl: NavController,
    private appVersion: AppVersion
  ) { }

  ngOnInit() {
    this.appVersion.getAppName().then((v) => { this.appName = v; });
    this.appVersion.getPackageName().then((v) => { this.packageName = v; });
    this.appVersion.getVersionCode().then((v) => { this.versionCode = v; });
    this.appVersion.getVersionNumber().then((v) => { this.versionNumber = v; });
  }
}
