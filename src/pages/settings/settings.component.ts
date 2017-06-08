import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FilePath } from '@ionic-native/file-path';
import { FileChooser } from '@ionic-native/file-chooser';
import { SettingsService } from "../../shared/service/settings.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
})
export class SettingsPage implements OnInit {

  constructor(
    public navCtrl: NavController,
    private filePath: FilePath,
    private fileChooser: FileChooser,
    private settings: SettingsService
  ) { }

  ngOnInit() {
  }

  onSoundClicked() {
    this.getSoundFilePath();
  }

  getSoundFilePath() {
    this.fileChooser.open()
      .catch()
      .then((url) => {
        console.log(`> you selected ${url}`);
        this.resolveFilePath(url);
      })
  }

  resolveFilePath(url) {
    this.filePath.resolveNativePath(url)
      .catch()
      .then((resolvedPath) => {
        this.settings.alarmSoundFileName = resolvedPath;
        console.log(`> resolved path is ${resolvedPath}`);
      })
  }

}