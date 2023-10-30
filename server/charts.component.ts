import { Component, Input} from '@angular/core';
import Chart from 'chart.js/auto';
import { DataService } from '../src/app/data.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent {
  @Input() selectedValue!: string;
  // @Input() data: any[] = [];
  // @Input() labels: string[] = [];

  data:any;
  dataproperty:any[] = [];
  dataState:any[]=[];

  constructor(private dataService: DataService){

  }
  
//   showChartData() {
//     const ctx = document.getElementById('myChart') as HTMLCanvasElement; // Using type assertion

//     if (ctx) {
//       const data = this.data.slice(0, 2); // Take the first two columns

//       new Chart(ctx, {
//         type: 'bar',
//         data: {
//           labels: this.labels.slice(0, 2), // Labels for the first two columns
//           datasets: [
//             {
//               label: 'Data',
//               data: data,
//               borderWidth: 1
//             }
//           ]
//         },
//         options: {
//           scales: {
//             y: {
//               beginAtZero: true
//             }
//           }
//         }
//       });
//     }
//   }
// }
  ngOnInit(){
    this.dataService.getData("properties").subscribe(res=>{
      // console.log(res);
      this.data = res;
      if(this.data!=null){
        for(let i=0;i<this.data.length;i++){
          this.dataState.push(this.data[i].State)
          this.dataproperty.push(this.data[i].PropertyID)
          console.log(this.dataState);
          console.log(this.dataproperty);
        }
      }
      this.showChartData(this.dataState,this.dataproperty);
    });
    this.selectedValue="";
 
  }

  showChartData(dataState:any,dataproperty:any){
    const ctx = document.getElementById('myChart');

    new Chart("myChart", {
      type: 'bar',
      data: {
        labels: dataState,
        datasets: [{
          label: 'chart of properties data',
          data: dataproperty,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

}
