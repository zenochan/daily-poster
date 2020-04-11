import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.scss']
})
export class QrcodeComponent implements OnInit
{
  qrcodeList = [];

  constructor() { }

  @Output()
  public change = new EventEmitter<string>();

  ngOnInit(): void
  {
  }

  fileChange($event: Event)
  {
    const input: any = event.target;
    const reader = new FileReader();
    reader.onload = () => {
      // const database64 = reader.result.replace(/^data:image\/(jpeg|jpg);base64,/, '');
      this.qrcodeList.unshift(reader.result.toString());
      this.qrcodeList = Array.from(new Set(this.qrcodeList));
      this.change.emit(reader.result.toString());
    };
    reader.readAsDataURL(input.files[0]);
  }

}
