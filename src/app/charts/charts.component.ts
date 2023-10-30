import { Component, Input, OnInit, OnDestroy ,OnChanges, SimpleChanges } from '@angular/core';
import Chart from 'chart.js/auto';
import { DataService } from '../data.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
// implements OnChanges
export class ChartsComponent implements OnChanges{
  @Input() selectedValue: string;
  chart: any;
  data: any;
  chartData: any;
  
  constructor(private dataService: DataService){
    this.data="";
    this.selectedValue="";
  }

        ngOnInit(){
          console.log(this.selectedValue);
          this.fetchChartData();
        }

        ngOnChanges(changes: SimpleChanges) {
          console.log("changes['selectedValue']");  
          if (changes['selectedValue'] && !changes['selectedValue'].firstChange){
            this.fetchChartData();

          }
      }
      ngOnDestroy() {
        // Ensure to destroy the chart when the component is destroyed to prevent memory leaks
        if (this.chart) {
          this.chart.destroy();
        }
      }

      // function to generate the charts everytime
      renderChart(data: any) {
        const ctx = document.getElementById('myChart')  as HTMLCanvasElement;
        if (!ctx) {
          return;
        }
    
        if (this.chart) {
          this.chart.destroy(); // Destroy the old chart if it exists
        }
    
        const keys = Object.keys(data);
    
        if (keys.length === 2) {
          const labels = Object.values(data[keys[0]]);
          const values = Object.values(data[keys[1]]);
          this.chart = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: labels,
              datasets: [
                {
                  label: 'Chart of properties data',
                  data: values,
                  borderWidth: 1,
                },
              ],
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          });
        } else {
          const labels = Object.keys(data);
          const values = Object.values(data);
          this.chart = new Chart(ctx, {
            type: 'pie',
            data: {
              labels: labels,
              datasets: [
                {
                  data: values,
                  backgroundColor: [
                    'red',
                    'blue',
                    'green',
                    'orange',
                  ],
                },
              ],
            },
            options: {
              responsive: true,
              maintainAspectRatio: false
          }
          });
        }
      }

      // fucnction to call api on changing the data everytime
      fetchChartData() {
        // this.selectedValue ="properties";
        if (this.selectedValue) {
          this.dataService.getData(this.selectedValue).subscribe(
            (data) => {
              this.data = data;
              // this.chartData = data;
              if (this.selectedValue === "properties"){
                this.chartData ={
                  labels: ['Property A', 'Property B', 'Property C'],
                  values: [112000, 214555, 150000],
                };
              }else{
                  this.chartData = {
                      Label1: 100,
                      Label2: 200,
                      Label3: 300,
                };

              }
              
              console.log('The data used for charts', data);
              this.renderChart(this.chartData);
            },
            (error) => {
              console.error('Failed to connect to the database: ', error);
            }
          );
        }
      }
    }

  