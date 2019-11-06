import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from "@angular/core";
import { Frequency, MachineFault } from "../../interfaces";
import * as CanvasJS from "../canvasjs.min.js";

const ABNORMAL_COLOR = "#ff6d00";
const NORMAL_COLOR = "#000000";
const STRIP_COLOR = "#4caf50";

@Component({
  selector: "app-dfft-chart",
  templateUrl: "./dfft-chart.component.html",
  styleUrls: ["./dfft-chart.component.scss"]
})
export class DfftChartComponent implements OnChanges, OnInit {
  @Input() abnormalFreq: Frequency[];
  @Input() normalFreq: Frequency[];
  @Input() fault: MachineFault;

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      (changes.normalFreq && changes.normalFreq.currentValue) ||
      (changes.abnormalFreq && changes.abnormalFreq.currentValue)
    ) {
      this._renderChart();
    } else if (
      changes.fault &&
      (changes.fault.currentValue || changes.fault.currentValue === null)
    ) {
      this._renderChart();
    }
  }

  private _renderChart(): void {
    const data = [];
    if (this.abnormalFreq) {
      data.push({
        type: "column",
        showInLegend: true,
        name: "Abnormal Frequency",
        lineColor: ABNORMAL_COLOR,
        markerColor: ABNORMAL_COLOR,
        dataPoints: this.abnormalFreq.map((freq: Frequency) => {
          return {
            x: freq.f,
            y: freq.v
          };
        }),
        toolTipContent:
          "{x}<br/> <span style='\"'color: {lineColor};'\"'>{name}</span>: <strong>{y}</strong>"
      });
    }

    if (this.normalFreq) {
      data.push({
        type: "column",
        showInLegend: true,
        name: "Normal Frequency",
        lineColor: NORMAL_COLOR,
        markerColor: NORMAL_COLOR,
        dataPoints: this.normalFreq.map((freq: Frequency) => {
          return {
            x: freq.f,
            y: freq.v
          };
        }),
        toolTipContent:
          "<span style='\"'color: {lineColor};'\"'>{name}</span>: <strong>{y}</strong>"
      });
    }

    const chart = new CanvasJS.Chart("chart", {
      animationEnabled: true,
      axisX: {
        crosshair: {
          enabled: true
        },
        stripLines: this.fault
          ? this.fault.fault_frequencies.map((v: number) => {
              return {
                value: v,
                color: STRIP_COLOR
              };
            })
          : []
      },
      axisY: {
        crosshair: {
          enabled: true
        }
      },
      toolTip: {
        shared: "true"
      },
      legend: {
        verticalAlign: "bottom",
        horizontalAlign: "center",
        cursor: "pointer",
        itemclick: e => {
          e.dataSeries.visible = !(
            typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible
          );
          e.chart.render();
        }
      },
      data,
      zoomEnabled: true
    });

    chart.render();
  }
}
