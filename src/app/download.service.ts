import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DownloadService
{
  public downloadEvent = new EventEmitter<any>();
  public redrawEvent = new EventEmitter<any>();

  constructor() { }
}
