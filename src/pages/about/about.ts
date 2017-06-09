import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  private fileName: string;

  constructor(
    public navCtrl: NavController
  ) { }

}
