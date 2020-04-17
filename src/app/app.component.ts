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

  history: PositionInfo[] = JSON.parse(localStorage.getItem('history') || '[]');
  preset: PositionInfo[] = [
    {name: '日历预设', x: 46, y: 1728, w: 172, h: 172},
    {name: '单款预设', x: 381, y: 560, w: 437, h: 437},
  ];

  refresh()
  {
    this.downloadService.redrawEvent.emit(true);

  }


  save()
  {
    this.downloadService.downloadEvent.emit(true);
    this.cacheOptions();
  }

  cacheOptions()
  {
    let index = this.preset.findIndex(item => item.x === this.options.x && item.y === this.options.y && item.w === this.options.w);
    if (index === -1) {
      index = this.history.findIndex(item => item.x === this.options.x && item.y === this.options.y && item.w === this.options.w);
      if (index !== -1) {
        this.history.splice(index, 1);
      }
      this.options.name = new Date().toString();
      this.history.unshift(JSON.parse(JSON.stringify(this.options)));
      localStorage.setItem('history', JSON.stringify(this.history));
    }

  }

  setOptions(info: PositionInfo)
  {
    this.options = JSON.parse(JSON.stringify(info));
    this.refresh();
  }

  delete(item: PositionInfo)
  {
    this.history = this.history.filter(res => res !== item);
    localStorage.setItem('history', JSON.stringify(this.history));
  }
}

