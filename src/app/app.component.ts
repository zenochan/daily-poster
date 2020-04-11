import {Component, OnChanges, SimpleChanges} from '@angular/core';
import {DownloadService} from './download.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent
{
  title = 'daily-poster';
  poster: ImageInfo;

  constructor(private downloadService: DownloadService)
  {
  }

  options: PositionInfo = {x: 381, y: 560, w: 437, h: 437};

  preset: PositionInfo[] = [
    {name: '日历预设', x: 46, y: 1728, w: 170, h: 170},
    {name: '单款预设', x: 381, y: 560, w: 437, h: 437},
  ];

  refresh()
  {
    this.downloadService.redrawEvent.emit(true);

  }


  save()
  {
    this.downloadService.downloadEvent.emit(true);
  }

  setOptions(info: PositionInfo)
  {
    this.options = JSON.parse(JSON.stringify(info));
    this.refresh();
  }
}

