// Importing Dependencies
import React, { Component } from 'react';
import QRCode from 'qrcode';

// Importing Components
import NavBar from '../components/NavBar';

// Importing Styles
import './Address.css';

class Address extends Component {
	componentDidMount() {
		// let canvas = React.findDOMNode(this.refs.eth).value;

		QRCode.toCanvas(
			document.getElementById('ETH_CANVAS'),
			'0x9b941d7ae9a9b4cdf0b821105ccb0feaf10a8de1',
			{
				scale: 10,
			},
			function(error) {
				if (error) console.error(error);
				console.log('success!');
			}
		);
		QRCode.toCanvas(
			document.getElementById('BTC_CANVAS'),
			'37VhBhZGbmFAgHZJunHVc6HNRBbtFEUbCf',
			{
				scale: 10,
			},
			function(error) {
				if (error) console.error(error);
				console.log('success!');
			}
		);
	}

	render() {
		return (
			<div className="Address">
				<div className="grid">
					<NavBar />

					<div className="address_container">
						<div className="sub_title">BTC Address:</div>
						<p>37VhBhZGbmFAgHZJunHVc6HNRBbtFEUbCf</p>
						<canvas id="BTC_CANVAS"></canvas>
					</div>
					<div className="address_container">
						<div className="sub_title">ETH Address:</div>
						<p>0x9b941d7ae9a9b4cdf0b821105ccb0feaf10a8de1</p>
						<canvas id="ETH_CANVAS"></canvas>
					</div>
				</div>
			</div>
		);
	}
}

export default Address;
