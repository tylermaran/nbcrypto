// Importing Dependencies
import React, { Component } from 'react';
import Chart from 'chart.js';

import './Chart.css';

class LineGraph extends Component {
    
	chartRef = React.createRef();

	componentDidUpdate() {
        console.log(this.props)
		const myChartRef = this.chartRef.current.getContext('2d');
		Chart.defaults.global.elements.line.tension = 0;

		new Chart(myChartRef, {
			type: 'line',
			data: {
				//Bring in data
				labels: this.props.data.SERIES,
				datasets: [
					{
						label: 'TOTAL',
                        data: this.props.data.DATA,
                        borderColor: "#98B9AB"

					},
				],
			},
			options: { responsive: true, maintainAspectRatio: false },
		});
	}
	render() {
		return (
			<div className="chart_outer">
				<canvas id="chart_container" ref={this.chartRef} />
			</div>
		);
	}
}

export default LineGraph;
