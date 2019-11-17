// Importing Dependencies
import React, { Component } from 'react';
import Chart from 'chart.js';

import './Chart.css';

class LineGraph extends Component {
    constructor(props) {
        super(props)
    }
    
	chartRef = React.createRef();

	componentDidMount() {
        console.log(this.props)
		const myChartRef = this.chartRef.current.getContext('2d');
		Chart.defaults.global.elements.line.tension = 0;

		new Chart(myChartRef, {
			type: 'line',
			data: {
				//Bring in data
				labels: ['1', '2', '3', '4', '5', '6', '7', '8'],
				datasets: [
					{
						label: 'ETH',
                        data: this.props.data,
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
