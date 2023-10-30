import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';


interface table {
  value: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedValue: string;
  chartData: any;
  data:any;
  tables: table[] = [
    { value: 'properties'},
    { value: 'propertysales'},
    { value: 'submarkets'},
  ];
 // // To store the fetched data

  constructor(private dataService: DataService) {
    this.selectedValue = ''; // Initialize with an empty string or a default value
    // this.data = 'this is data';
  }


  // onDatabaseChange() {
  //   if (this.selectedValue) {
  //     this.dataService.getData(this.selectedValue).subscribe(
  //       (data) => {
  //         this.data = data; // Store the data in the 'data' property
  //         console.log(typeof(data))
  //         console.log('Data from the database:', data);
  //       },
  //       (error) => {
  //         console.error('Failed to connect to the database: ', error);
  //       }
  //     );
  //   }
  onDatabaseChange() {
    if (this.selectedValue) {
      this.dataService.getData(this.selectedValue).subscribe(
        (data) => {
          this.data = data; // Store the data in the 'data' property
          // console.log(typeof(data))
          console.log('Data from the database:', data);
        },
        (error) => {
          console.error('Failed to connect to the database: ', error);
        }
      );
    }

  }

}