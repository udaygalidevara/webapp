import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import * as CanvasJS from '../canvasjs.min';
import {DataPoint} from '../../interfaces';
import uuid from 'uuid';


const ABNORMAL_COLOR = '#ff6d00';
const NORMAL_COLOR = '#000000';

const NORMAL_FREQ_TITLE = 'i-rms Normal';
const ABNORMAL_FREQ_TITLE = 'i-rms Abnormal';


@Component({
    selector: 'app-irms-chart',
    templateUrl: './irms-chart.component.html',
    styleUrls: ['./irms-chart.component.scss']
})
export class IrmsChartComponent implements OnChanges, OnInit {

    readonly id: string;
    @Input() abnormalData: DataPoint[];
    @Input() normalData: DataPoint[];

    constructor() {
        this.id = 'd-' + uuid.v4();
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if ((changes.normalData && changes.normalData.currentValue) ||
            (changes.abnormalData && changes.abnormalData.currentValue)) {
            this._renderChart();
        }
    }

    private _renderChart(): void {
        const data = [];
        if (this.abnormalData) {
            data.push({
                type: 'line',
                showInLegend: true,
                name: ABNORMAL_FREQ_TITLE,
                lineColor: ABNORMAL_COLOR,
                markerColor: ABNORMAL_COLOR,
                dataPoints: this.abnormalData,
                toolTipContent: '{x}<br/> <span style=\'"\'color: {lineColor};\'"\'>{name}</span>: <strong>{y}</strong>',
                axisXType: this.normalData ? 'secondary' : 'primary',
            });
        }
        if (this.normalData) {
            data.push({
                type: 'line',
                showInLegend: true,
                name: NORMAL_FREQ_TITLE,
                lineColor: NORMAL_COLOR,
                markerColor: NORMAL_COLOR,
                dataPoints: this.normalData,
                toolTipContent: '<span style=\'"\'color: {lineColor};\'"\'>{name}</span>: <strong>{y}</strong>',
            });
        }

        const getAxis = (title: string) => {
            return {title: NORMAL_FREQ_TITLE};
        };
        let axisX;
        let axisX2;
        if (this.normalData && this.abnormalData) {
            axisX = getAxis(NORMAL_FREQ_TITLE);
            axisX2 = getAxis(ABNORMAL_FREQ_TITLE);
        } else if (this.abnormalData) {
            axisX = getAxis(ABNORMAL_FREQ_TITLE);
        } else {
            axisX = getAxis(NORMAL_FREQ_TITLE);
        }

        const chart = new CanvasJS.Chart('irmsChart', {
            animationEnabled: true,
            axisX,
            axisX2,
            axisY: {
                crosshair: {
                    enabled: true
                }
            },
            toolTip: {
                shared: 'true'
            },
            legend: {
                verticalAlign: 'bottom',
                horizontalAlign: 'center',
                cursor: 'pointer',
                itemclick: (e) => {
                    e.dataSeries.visible = !(typeof (e.dataSeries.visible) === 'undefined' || e.dataSeries.visible);
                    e.chart.render();
                },
            },
            data,
            zoomEnabled: true
        });

        chart.render();
    }
}
