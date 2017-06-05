import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import moment from "moment";

import { Kuri } from "../../shared/model/kuri";
import { Samayam } from "../../shared/service/samayam";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(
    public navCtrl: NavController,
    public kuri: Kuri,
    public samayam: Samayam,
    private msgbox: AlertController
  ) { }

  ngOnInit() {
    this.kuri = this.getSavedKuriOrNew();
  }

  onArrivalDateChange() {
    this.saveKuriToLocalStorage();
  }

  onArrivalTimeChange() {
    this.kuri.leaveTime = this.getLeaveTime();
    this.saveKuriToLocalStorage();
  }

  onResetKuriClicked() {
    localStorage.clear();
    this.kuri = this.newKuri();
    this.saveKuriToLocalStorage();
  }

  onCalculateCurrentTaskTimeClicked() {
    this.calculateCurrentTaskTime();
    this.updateLoggedTimeConfirm();
  }

  getSavedKuriOrNew(): Kuri {
    let kuri = JSON.parse(localStorage.getItem("kuri"));
    if (kuri == null) {
      kuri = this.newKuri();
    }
    return kuri;
  }

  newKuri(): Kuri {
    let kuri = new Kuri();
    let date = new Date();
    kuri.arrivalDate = this.samayam.convertToDateString(date);
    kuri.arrivalTime = this.samayam.convertToTimeString(date);
    kuri.currentTime = this.samayam.convertToTimeString(date);
    kuri.leaveTime = null;
    kuri.loggedTime = "";
    kuri.taskTime = "";
    return kuri;
  }

  saveKuriToLocalStorage() {
    localStorage.setItem("kuri", JSON.stringify(this.kuri));
  }

  getArrivalDate() {
    let today = new Date(this.kuri.arrivalDate);
    let time = this.kuri.arrivalTime.split(":");
    today.setHours(parseInt(time[0]));
    today.setMinutes(parseInt(time[1]));
    return today;
  }

  getLeaveTime() {
    let today = this.getArrivalDate();
    today.setHours(today.getHours() + 8);
    today.setMinutes(today.getMinutes() + 15);
    console.log('> leave date', today);
    return today;
  }


  calculateCurrentTaskTime() {
    // task-time = current-time - (arrival-time + logged-time) + 10 mins documentation time
    let loggedTime = this.getArrivalDate();
    let currentTime = new Date();

    this.kuri.loggedTime = this.kuri.loggedTime || "0:00";
    let time = this.kuri.loggedTime.split(":");
    loggedTime.setHours(parseInt(time[0]) + loggedTime.getHours());
    loggedTime.setMinutes(parseInt(time[1]) + loggedTime.getMinutes());

    let differnce = (+(currentTime) - +(loggedTime))
    this.kuri.taskTime = this.samayam.convertSecondsToHourMinFormat(differnce);
  }

  updateLoggedTimeConfirm() {
    let confirm = this.msgbox.create({
      title: "Update logged time",
      subTitle: `Are you sure to add <b>${this.kuri.taskTime}</b> to logged time?`,
      buttons: [
        { text: 'Nope', handler: () => { console.log('> mia!'); } },
        {
          text: 'Yep', handler: () => {
            this.updateLoggedTime();
          }
        }
      ]
    });
    confirm.present();
  }

  updateLoggedTime() {

  }


}
