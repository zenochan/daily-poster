import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-poster',
  templateUrl: './poster.component.html',
  styleUrls: ['./poster.component.scss']
})
export class PosterComponent implements OnInit
{

  @Input()
  poster: ImageInfo;

  @Output()
  posterChange = new EventEmitter<ImageInfo>();

  constructor() { }


  ngOnInit(): void
  {
  }

  fileChange($event: Event)
  {
    const input: any = event.target;

    const reader = new FileReader();
    const file: File = input.files[0];
    reader.onload = () => {
      this.poster = {
        name: file.name.replace(/.[^.]+$/, ''),
        base64: reader.result.toString()
      };
      this.posterChange.emit(this.poster);
    };
    reader.readAsDataURL(file);
  }
}
