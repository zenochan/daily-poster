import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-poster',
  templateUrl: './poster.component.html',
  styleUrls: ['./poster.component.scss']
})
export class PosterComponent implements OnInit
{

  posterList: string[] = [];

  @Output()
  change = new EventEmitter<string>();

  constructor() { }


  ngOnInit(): void
  {
  }

  fileChange($event: Event)
  {
    const input: any = event.target;
    const reader = new FileReader();
    reader.onload = () => {
      // const database64 = reader.result.replace(/^data:image\/(jpeg|jpg);base64,/, '');
      this.posterList.unshift(reader.result.toString());
      this.posterList = Array.from(new Set(this.posterList));
      this.change.emit(reader.result.toString());
    };
    reader.readAsDataURL(input.files[0]);
  }

}
