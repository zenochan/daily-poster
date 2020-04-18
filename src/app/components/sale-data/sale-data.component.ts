import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-sale-data',
  templateUrl: './sale-data.component.html',
  styleUrls: ['./sale-data.component.scss']
})
export class SaleDataComponent implements OnInit
{
  saleData: SaleData;

  countdown = 0;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void
  {
    setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        this.getData();
        this.countdown = 60;
      }
    }, 1000);

  }


  getData()
  {
    this.httpClient.post<any>(
        'https://shop.immatchu.com/api/performance/real-time-stats', null,
        {headers: {'X-Token': 'YTQ2MGE4OTA5NzhiN2NkYmFmOTllMzdhYzNlNzY5MzQ='}}
    ).subscribe(res => {
      this.saleData = res;
    }, e => console.error(e));
  }
}
