import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IDirectoryDTO, IDirectoryTreeItem, TreeItemTypes } from '../models/directory.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FileManagerService {

  directoryTree$: BehaviorSubject<IDirectoryTreeItem[]> = new BehaviorSubject<IDirectoryTreeItem[]>(
    [],
  );

  constructor(private http: HttpClient) {}

  private static parseFileType(title: string): string {
    if (title.includes('.zip')) {
      return 'archive';
    } else if (title.includes('.epub')) {
      return 'article';
    } else if (title.includes('.jpg')) {
      return 'image';
    } else {
      return 'folder';
    }
  }

  getRootDirectory(): void {
    this.fetchDirectories().subscribe((data: IDirectoryTreeItem) => this.directoryTree$.next(data.children));
  }

  getDirectory(directory: IDirectoryTreeItem): void {
    directory.isLoading = true;
    this.fetchDirectories(directory.id).subscribe((data: IDirectoryTreeItem) => {
      directory.children = [...data.children];
      directory.isLoading = false;
      directory.isOpen = true;
    });
  }

  public fetchDirectories(id?: number): Observable<IDirectoryTreeItem> {
    return this.http
      .get<IDirectoryDTO>(
        id
          ? `https://cors-anywhere.herokuapp.com/http://164.90.161.80:3000/api/content?dirId=${id}`
          : 'https://cors-anywhere.herokuapp.com/http://164.90.161.80:3000/api/content',
      )
      .pipe(map((data: IDirectoryDTO) => this.mapDtoToView(data)));
  }

  private mapDtoToView(data: IDirectoryDTO): IDirectoryTreeItem {
    return {
      id: data.id,
      title: data.title,
      isOpen: false,
      type: data.children ? TreeItemTypes.Directory : TreeItemTypes.File,
      children: data.children ? data.children.map((item) => this.mapDtoToView(item)) : [],
      isLoading: false,
      icon: data.children ? 'folder' : FileManagerService.parseFileType(data.title),
    };
  }
}
