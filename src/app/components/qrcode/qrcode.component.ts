import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.scss']
})
export class QrcodeComponent implements OnInit
{
  qrcodeList: ImageInfo[] = [];

  @Input()
  poster: ImageInfo;

  @Input()
  options: PositionInfo;

  constructor() { }

  ngOnInit(): void
  {
  }

  fileChange($event: Event)
  {
    const input: any = event.target;
    this.qrcodeList = [];

    Object.values(input.files).forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = () => this.qrcodeList.unshift({
        name: file.name.replace(/.[^.]+$/, ''),
        base64: reader.result.toString()
      });
      reader.readAsDataURL(file);
    });
  }
}
