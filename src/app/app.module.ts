import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { DataService } from './data.service';
import { HttpClientModule } from '@angular/common/http';
import { ChartsComponent } from './charts/charts.component';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    ChartsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    HttpClientModule,
    MatInputModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }





