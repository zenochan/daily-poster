import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit
{
  title = 'daily-poster';

  qrcode = {
    x: 300,
    y: 470,
    w: 480,
    h: 480
  };

  posterUrl: string;
  qrcodeUrl: string;


  @ViewChild('canvas')
  canvas: ElementRef;
  height = 1920;

  // canvasEl: HTMLCanvasElement;

  get ctx()
  {
    return (this.canvas.nativeElement as HTMLCanvasElement).getContext('2d');
  }

  ngAfterViewInit(): void
  {
    console.error(this.canvas.nativeElement);
  }

  onPosterChange(poster: string)
  {
    this.posterUrl = poster;
    this.draw();
    // this.checkPicurl(poster);


  }


  onQrcdeChange(url: string)
  {
    this.qrcodeUrl = url;
    this.draw();
  }

  draw()
  {
    const image = new Image();
    image.src = this.posterUrl;
    image.onload = () => {
      this.height = 1080 * image.height / image.width;
      this.ctx.clearRect(0, 0, 375, this.height);
      this.ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, 1080, this.height);
    };

    if (this.qrcodeUrl) {
      const qrcode = new Image();
      qrcode.src = this.qrcodeUrl;
      qrcode.onload = () => {
        this.ctx.drawImage(qrcode,
            0, 0, qrcode.width, qrcode.height,
            this.qrcode.x, this.qrcode.y, this.qrcode.w, this.qrcode.h
        );
      };
    }
  }

  save()
  {
    const canvas = this.canvas.nativeElement;
    const strDataURI = canvas.toDataURL('image/jpeg');

    const a = document.createElement('a');
    a.href = strDataURI;
    a.download = '顾问';
    a.click();

    // window.open(strDataURI, '_blank');
    // const image = strDataURI.replace('image/jpeg', 'image/octet-stream');
    // window.location.href = image;
  }
}

