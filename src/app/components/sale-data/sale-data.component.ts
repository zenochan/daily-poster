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
  token = localStorage.getItem('token') || null;
  interval?: number;

  username = 'yangmian';
  password = '9EuuTK';
  msg = '';

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void
  {
    this.startInterval();
  }

  startInterval()
  {
    this.countdown = 0;
    this.interval = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        this.getData();
      }
    }, 1000);

  }


  getData()
  {
    if (!this.token) {
      clearInterval(this.interval);
      this.login();
      return;
    }

    this.countdown = 60;
    this.httpClient.post<any>(
        'https://shop.immatchu.com/api/performance/real-time-stats', null,
        {headers: {'X-Token': this.token}}
    ).subscribe(res => {
      if (res.errorCode) {
        alert(res.message);
        this.token = null;
        localStorage.removeItem('token');
        clearInterval(this.interval);
      } else {
        res.current_time = res.current_time.replace(/-/g, '/');
        this.saleData = res;
      }
    });
  }


  sendSmsCode()
  {
    this.httpClient.get<any>('http://auth.immatchu.com/api/system/sendSms?username=yangmian')
        .subscribe(res => {
          if (res.code === '1') {
            alert('验证码已发送');
          } else {
            alert(res.message);
          }
        });
  }

  login()
  {
    this.httpClient.post<any>('http://auth.immatchu.com/api/system/login', {
      username: this.username,
      password: this.password,
      msg: this.msg
    }).subscribe(res => {
      switch (parseInt(res.code, 0)) {
        case 1:
          this.token = res.data.token;
          localStorage.setItem('token', this.token);
          this.startInterval();
          break;
        case 10003:
          this.sendSmsCode();
          break;
        default:
          alert(res.message);
      }
    });
  }
}
