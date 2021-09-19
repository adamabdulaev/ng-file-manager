import { Component, Input } from '@angular/core';
import { FileManagerService } from '../core/services/file-manager.service';
import { IDirectoryTreeItem, TreeItemTypes } from '../core/models/directory.interface';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.scss'],
})
export class FileManagerComponent {
  @Input() treeItems: IDirectoryTreeItem[] = [];

  treeItemType = TreeItemTypes;


  constructor(private fileManagerService: FileManagerService) {}

  openDirectory(directory: IDirectoryTreeItem): void {
    if (directory.isOpen) {
      directory.isOpen = false;
    } else {
      if (directory.children.length) {
        directory.isOpen = true;
      } else {
        this.fileManagerService.getDirectory(directory);
      }
    }
  }
}
