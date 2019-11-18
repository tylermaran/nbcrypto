// Importing Dependencies
import React, { Component } from 'react';
import QRCode from 'qrcode';

// Importing Components
import NavBar from '../components/NavBar';

// Importing Styles
import './Address.css';

// Importing Wallets
import wallets from '../wallets.json';

class Address extends Component {
	constructor() {
		super();
		this.state = {
			addresses: '',
		};
	}
	componentDidMount() {
		let temp = wallets.wallets.map(this.map_address);
		this.setState(
			{
				addresses: temp,
			},
			() => {

				for (let i = 0; i < wallets.wallets.length; i++) {
					QRCode.toCanvas(
						document.getElementById(wallets.wallets[i].address),
						wallets.wallets[i].address,
						{
							scale: 10,
						},
						function(error) {
							if (error) console.error(error);
						}
					);
				}
			}
		);
	}

	map_address = address => {
		return (
			<div className="address_container" key={address.address}>
				<div className="sub_title">{address.coin} Address:</div>
				<p>{address.address}</p>
				<canvas
					className="address_canvas"
					id={address.address}
				></canvas>
				<p className="address_note">{address.note}</p>
			</div>
		);
	};

	render() {
		return (
			<div className="Address">
				<div className="grid">
					<NavBar page="Address" />
					{this.state.addresses}
				</div>
			</div>
		);
	}
}

export default Address;
