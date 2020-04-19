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
      }
    }, 1000);

  }


  getData()
  {
    const token = location.search.replace('?', '');
    if (!token) {
      alert('token 无效');
      return;
    }

    this.countdown = 60;
    this.httpClient.post<any>(
        'https://shop.immatchu.com/api/performance/real-time-stats', null,
        {headers: {'X-Token': token}}
    ).subscribe(res => {
      if (res.errorCode) {
        alert(res.message);
        window.close();
      } else {
        res.current_time = res.current_time.replace(/-/g, '/');
        this.saleData = res;
      }
    }, e => {
      alert(e);
      window.close();
    });
  }
}
