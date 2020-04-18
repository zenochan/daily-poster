import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppComponent} from "./app.component";
import {SaleDataComponent} from "./components/sale-data/sale-data.component";
import {HomeComponent} from "./home/home.component";


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'sale', component: SaleDataComponent},
  {path: '*', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
