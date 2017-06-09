import { Injectable } from '@angular/core';
import { Settings } from "../model/index";

@Injectable()
export class SettingsService {

  constructor() { }

  getSettings(): Settings {
    let settings = JSON.parse(localStorage.getItem("settings"));
    if (!settings)
      settings = {
        notificationText: "Time's up, Have a good day!",
        notificationSoundFileName: ""
      };

    return settings;
  }

  saveSettings(settings: Settings) {
    localStorage.setItem("settings", JSON.stringify(settings));
  }
}