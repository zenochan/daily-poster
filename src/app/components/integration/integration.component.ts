import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {DownloadService} from "../../download.service";

@Component({
  selector: 'app-integration',
  templateUrl: './integration.component.html',
  styleUrls: ['./integration.component.scss']
})
export class IntegrationComponent implements OnInit, OnChanges
{
  @Input()
  poster: ImageInfo;
  @Input()
  qrcode: ImageInfo;

  @ViewChild('canvas')
  canvas: ElementRef;
  width = 1080;
  height = 1920;


  @Input()
  options: PositionInfo = {
    x: 300,
    y: 470,
    w: 480,
    h: 480
  };


  constructor(private downloadService: DownloadService)
  {
    downloadService.redrawEvent.subscribe(() => this.draw());
    downloadService.downloadEvent.subscribe(() => this.save());
  }

  ngOnInit(): void
  {
  }

  ngOnChanges(changes: SimpleChanges): void
  {
    this.draw();
  }

  get ctx()
  {
    return (this.canvas.nativeElement as HTMLCanvasElement).getContext('2d');
  }


  draw()
  {
    if (!this.poster || !this.qrcode) {
      return;
    }

    const image = new Image();
    image.src = this.poster.base64;
    image.onload = () => {
      this.width = image.width;
      this.height = image.height;
      console.error(image.height, image.width);
      setTimeout(() => {
        this.ctx.drawImage(image, 0, 0, image.width, image.height);
        this.drawCode();
      }, 100);
    };
  }

  drawCode()
  {
    const qrcode = new Image();
    qrcode.src = this.qrcode.base64;
    qrcode.onload = () => {
      this.ctx.drawImage(qrcode, this.options.x, this.options.y, this.options.w, this.options.w);
    };
  }

  save()
  {
    const canvas = this.canvas.nativeElement;
    const strDataURI = canvas.toDataURL('image/jpeg');

    const a = document.createElement('a');
    a.href = strDataURI;
    a.download = this.poster.name + this.qrcode.name;
    a.click();
  }

  preview()
  {
    // const canvas = this.canvas.nativeElement;
    // const strDataURI = canvas.toDataURL('image/jpeg');
    //
    // const a = document.createElement('a');
    //
    // a.href = strDataURI;
    // a.target = '_blank';
    // a.click();
  }
}
