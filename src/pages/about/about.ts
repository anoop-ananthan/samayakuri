import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FilePath } from '@ionic-native/file-path';
import { FileChooser } from '@ionic-native/file-chooser';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  private fileName: string;

  constructor(
    public navCtrl: NavController,
    private filePath: FilePath,
    private fileChooser: FileChooser
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
        this.fileName = resolvedPath;
        console.log(`> resolved path is ${resolvedPath}`);
      })
  }

}
