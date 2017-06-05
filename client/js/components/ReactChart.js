import React from 'react';
import Chart from 'chart.js';
import PropTypes from 'prop-types';
import {arraysAreEqual} from '../utils';

export default class ReactChart extends React.Component {
    render() {
        return (
            <div style={{position: 'relative'}}>
                <canvas ref={canvas => this.canvas = canvas}/>
            </div>
        )
    }

    componentDidMount() {
        this._rebuildChart();
    }

    componentDidUpdate() {
        this._rebuildChart();
    }

    shouldComponentUpdate(nextProps) {
        return (
            !arraysAreEqual(this.props.data, nextProps.data) ||
            !arraysAreEqual(this.props.labels, nextProps.labels)
        );
    }

    _rebuildChart() {
        if (this.chart)
            this.chart.destroy();
        this.chart = new Chart(this.canvas, {
            type: 'line',
            data: {
                labels: this.props.labels || this.props.data.map((d, i) => i),
                datasets: [{
                    data: this.props.data,
                    backgroundColor: 'transparent',
                    borderColor: 'black',
                    borderWidth: 1
                }]
            },
            options: {
                animation: false,
                legend: false,
                tooltips: {
                    callbacks: {
                        label: this.props.tooltipLabelCallback
                    }
                }
            }
        });
    }
}

ReactChart.propTypes = {
    data: PropTypes.arrayOf(PropTypes.number).isRequired,
    labels: PropTypes.arrayOf(PropTypes.string),
    tooltipLabelCallback: PropTypes.func
};