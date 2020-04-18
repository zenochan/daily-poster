import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-sale-data',
  templateUrl: './sale-data.component.html',
  styleUrls: ['./sale-data.component.scss']
})
export class SaleDataComponent implements OnInit
{

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void
  {
    // window['saleData'] = (res) => {
    //
    // };
    this.httpClient.post('https://shop.immatchu.com/api/performance/real-time-stats', null, {
      headers: {
        'X-Token': 'YTQ2MGE4OTA5NzhiN2NkYmFmOTllMzdhYzNlNzY5MzQ='
      }
    }).subscribe(res => {

    }, e => console.error(e));

  }

}
