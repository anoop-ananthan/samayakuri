import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';

import moment from "moment";

import { Kuri } from "../../shared/model/kuri";
import { SettingsService } from "../../shared/service/settings.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  reminderColor: string = "danger";

  constructor(
    public navCtrl: NavController,
    public kuri: Kuri,
    private msgbox: AlertController,
    private localNotifications: LocalNotifications,
    private settingsService: SettingsService
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
    this.resetAlarm();
    localStorage.clear();
    this.kuri = this.newKuri();
    this.saveKuriToLocalStorage();
  }

  onCalculateCurrentTaskTimeClicked() {
    this.calculateCurrentTaskTime();
    this.confirmAddLoggedTimeAndCurrentTime();
  }

  onAlarmClicked() {
    this.reminderColor = (this.reminderColor == "success") ? "danger" : "success";
    if (this.reminderColor == "success")
      this.setReminder();
    else
      this.resetAlarm();
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
    kuri.arrivalDate = moment().format("YYYY-MM-DD");
    kuri.arrivalTime = moment().format("HH:mm");
    kuri.currentTime = moment().format("HH:mm");
    kuri.leaveTime = null;
    kuri.loggedTime = "";
    kuri.taskTime = "";
    return kuri;
  }

  saveKuriToLocalStorage() {
    localStorage.setItem("kuri", JSON.stringify(this.kuri));
  }

  getArrivalDateAndTime() {
    let today = moment(`${this.kuri.arrivalDate} ${this.kuri.arrivalTime}`);
    return new Date(today.format());
  }

  getLeaveTime() {
    let arrival = moment(this.getArrivalDateAndTime());
    let departure = arrival.add({ h: 8, m: 15 });
    return new Date(departure.format());
  }

  calculateCurrentTaskTime() {
    let nowInMilliseconds = moment(new Date().getTime());
    let arrivalTime = moment.duration(this.kuri.arrivalTime);
    let loggedTime = moment.duration(this.kuri.loggedTime);
    let currentTaskTime = nowInMilliseconds.subtract(arrivalTime).subtract(loggedTime).add(moment.duration({ m: 5 }));
    this.kuri.taskTime = currentTaskTime.format("H:mm");
  }

  confirmAddLoggedTimeAndCurrentTime() {
    let confirm = this.msgbox.create({
      title: "Update logged time",
      subTitle: `You have <b>${this.kuri.taskTime}</b> in current task. Do you want to add that to logged time?`,
      buttons: [
        { text: 'No', handler: () => { console.log('> mia!'); } },
        {
          text: 'Yes', handler: () => {
            this.updateLoggedTime();
          }
        }
      ]
    });
    confirm.present();
  }

  updateLoggedTime() {
    let currentTaskTime = moment.duration(this.kuri.taskTime);
    let loggedTime = moment.duration(this.kuri.loggedTime);
    let totalLoggedTime = currentTaskTime.add(loggedTime);
    this.kuri.loggedTime = moment.utc(totalLoggedTime.asMilliseconds()).format("HH:mm");
    this.kuri.taskTime = null;
  }

  setReminder() {
    let settings = this.settingsService.getSettings();
    this.localNotifications.clearAll();
    this.localNotifications.schedule({
      id: 1,
      at: this.kuri.leaveTime,
      text: settings.notificationText,
      sound: settings.notificationSoundFileName,
      data: { secret: "Anoop" }
    });
  }

  resetAlarm() {
    this.localNotifications.clearAll();
    this.reminderColor = "danger";
  }
}
