import { Chart } from 'chart.js';
import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit } from '@angular/core';
import { CHART_COLOR_ARRAY } from './color-array';

@Component({
  selector: 'app-chart-element',
  templateUrl: './chart-element.component.html',
})
export class ChartElementComponent implements OnInit, AfterViewInit {
  @ViewChild('chart') chart: ElementRef;

  @Input() showDropdownMenu: boolean;
  @Input() dropdownData: string[];
  @Input() coffeeJson: string;
  @Input() type: string;
  @Input() labels: string[];
  @Input() func: (item: any, param?: string) => any;
  @Input() funcMultipleSets: (item: any, param?: string) => any[][];

  chartGraph: any;
  chartData = {
    labels: [],
    datasets: [
      {
        label: '',
        data: [] as any,
        backgroundColor: [] as any,
      },
    ] as any,
  };

  constructor() {}

  ngOnInit() {
    if (this.funcMultipleSets) {
      // multiple data sets, 2 or more, don't have currently anything to load immediately
    } else {
      // only one dataset
      this.chartData.datasets[0].data = this.func(this.coffeeJson);
      this.chartData.datasets[0].backgroundColor = this.setBackgroundColor(this.type);
    }
    this.chartData.labels = this.labels;
  }

  ngAfterViewInit() {
    // filling chart with input data
    this.chartGraph = new Chart(this.chart.nativeElement.getContext('2d'), {
      type: this.type,
      data: this.chartData,
      options: this.setOptions(this.type),
    });
  }

  /*
    on select change <ng-select>, only adjusted for grindType vertical bar
    if it is going to be reused that it needs to be modified in terms of sending
    properties/functions through component input()
 */
  selectOptionChart(value: string) {
    if (this.func) {
      this.chartData.datasets[0].data = this.func(this.coffeeJson, value);
    } else {
      const multipleArr = this.funcMultipleSets(this.coffeeJson, value);
      this.chartData.datasets = [];
      this.chartData.labels = this.getPropertyList(multipleArr, 'grindType');

      // properties, functions for filling chart
      const labelSingle = ['bitterness', 'sweetness', 'acidity', 'intensity'];
      const multipleArrData = this.removePropertyFromArray(multipleArr, 'grindType');
      const backgrounds = this.setBackgroundColor('bar');

      for (let i = 0; i < labelSingle.length; i++) {
        this.chartData.datasets.push({
          label: labelSingle[i],
          data: multipleArrData.map((x) => x[i]),
          backgroundColor: backgrounds[i],
        });
      }
    }

    this.chartGraph.update();
  }

  setOptions(chartType: string) {
    if (chartType === 'pie') {
      return { responsive: false, title: { display: true, text: 'Pie chart' } };
    }

    if (chartType === 'bar') {
      return {
        scales: {
          xAxes: [],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                max: 10,
              },
            },
          ],
        },
      };
    }
    if (chartType === 'polarArea') {
      return {
        responsive: true,
        legend: {
          position: 'right',
        },
        title: {
          display: true,
          text: ' Polar Area Chart',
        },
        scale: {
          ticks: {
            beginAtZero: true,
          },
          reverse: false,
        },
        animation: {
          animateRotate: false,
          animateScale: true,
        },
      };
    }
  }
  // see link for colors https://htmlcolorcodes.com/color-names/
  setBackgroundColor(chartType: string) {
    if (chartType === 'pie') {
      return CHART_COLOR_ARRAY;
    }
    if (chartType === 'bar') {
      return CHART_COLOR_ARRAY;
    }
    if (chartType === 'polarArea') {
      return CHART_COLOR_ARRAY;
    }
  }

  getPropertyList(array: any[], prop: string): any[] {
    return array.map((x: any) => x[prop]);
  }

  removePropertyFromArray(array: any[], prop: string): any[] {
    const keys = Object.keys({
      grindType: '',
      bitterness: '',
      sweetness: '',
      acidity: '',
      intensity: '',
    });

    return array
      .map((x: any, i: number) =>
        keys.map((key) => {
          if (key !== prop) {
            return array[i][key];
          }
          return -1;
        })
      )
      .map((x) => x.filter((y) => y !== -1));
  }
}

// code for generating array of colors

// var letters = '0123456789ABCDEF';
// var color = '#';
// var array = [];
// for (var j = 0; j < 60; j++) {
//   for (var i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * 16)];
//   }
//   array.push(color);
//   color = '#';
// }
