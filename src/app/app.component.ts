import { Component } from '@angular/core';
import { FileManagerService } from './core/services/file-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor(public fileManagerService: FileManagerService) {
    this.fileManagerService.getRootDirectory();
  }
}
