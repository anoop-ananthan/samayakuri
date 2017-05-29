import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import moment from "moment";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  arrivalDate: String = this.getDateInString(new Date());
  arrivalTime: String = this.getTimeInString(new Date());
  leaveTime: String = "";
  loggedTime: String = "0:00";
  currentTime: String = this.getTimeInString(new Date());

  constructor(
    public navCtrl: NavController
  ) { }

  ngOnInit() { }



  onArrivalTimeChange() {
    this.leaveTime = this.getLeaveTime();
  }

  getArrivalDate() {
    let today = new Date(this.arrivalDate.toString());
    let time = this.arrivalTime.split(":");
    today.setHours(parseInt(time[0]));
    today.setMinutes(parseInt(time[1]));
    return today;
  }

  getLeaveTime() {
    let today = this.getArrivalDate();
    today.setHours(today.getHours() + 8);
    today.setMinutes(today.getMinutes() + 15);
    return this.getTimeInString(today);
  }

  getCurrentTaskTime() {
    let loggedTime = this.getArrivalDate();
    this.loggedTime = this.loggedTime || "0:00";
    let time = this.loggedTime.split(":");
    loggedTime.setHours(parseInt(time[0]));
    loggedTime.setMinutes(parseInt(time[1]));
    let currentTime = this.getCurrentTime();

    console.log('> total logged time', loggedTime);
    console.log('> currrent time', currentTime);

    let differnce = (loggedTime - currentTime)



  }

  getCurrentTime() {
    this.currentTime = this.currentTime || this.getTimeInString(new Date());
    let day = new Date(this.arrivalDate.toString());
    let time = this.currentTime.split(":");
    day.setHours(parseInt(time[0]));
    day.setMinutes(parseInt(time[1]));
    return day;
  }


  getDateInString(date) {
    date = date || new Date();
    let day = this.padLeftWithZero(date.getDate());
    let month = this.padLeftWithZero(date.getMonth() + 1);
    let year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  getTimeInString(now) {
    now = now || new Date();
    let hour = this.padLeftWithZero(now.getHours());
    let mins = this.padLeftWithZero(now.getMinutes());
    return `${hour}:${mins}`;
  }

  padLeftWithZero(value) {
    var s = value + "";
    while (s.length < 2) s = "0" + s;
    return s;
  }

}
