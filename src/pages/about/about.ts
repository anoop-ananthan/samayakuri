import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FilePath } from '@ionic-native/file-path';
import { FileChooser } from '@ionic-native/file-chooser';
import { SettingsService } from "../../shared/service/settings.service";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  private fileName: string;

  constructor(
    public navCtrl: NavController,
    private filePath: FilePath,
    private fileChooser: FileChooser,
    private settings: SettingsService
  ) { }

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
