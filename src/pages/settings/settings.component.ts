import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FilePath } from '@ionic-native/file-path';
import { FileChooser } from '@ionic-native/file-chooser';
import { SettingsService } from "../../shared/service/settings.service";
import { Settings } from "../../shared/model/index";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
})
export class SettingsPage implements OnInit {

  constructor(
    public navCtrl: NavController,
    private filePath: FilePath,
    private fileChooser: FileChooser,
    private settingsService: SettingsService,
    private settings: Settings
  ) { }

  ngOnInit() {
    this.settings = this.settingsService.getSettings();
  }

  onSoundClicked() {
    this.getSoundFilePath();
  }

  onSettingsSaveClicked() {
    this.settingsService.saveSettings(this.settings);
  }

  getSoundFilePath() {
    this.fileChooser.open()
      .catch()
      .then((url) => {
        this.resolveFilePath(url);
      })
  }

  resolveFilePath(url) {
    this.filePath.resolveNativePath(url)
      .catch()
      .then((resolvedPath) => {
        this.settings.notificationSoundFileName = resolvedPath;
      })
  }
}