// Importing Dependencies
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Importing Components
import NavBar from '../components/NavBar';
import About from '../components/About';
import RecentTrans from '../components/RecentTrans';
import Chart from '../components/Chart';

// Importing Styling
import './Landing.css';

import { BTC_EXCHANGE, ETH_EXCHANGE, GET_BTC, GET_ETH } from '../api';

// Importing Wallets
// import wallets from '../wallets.json';

class Landing extends Component {
	constructor(props) {
		super(props);
		this.state = {
			BTC: '37VhBhZGbmFAgHZJunHVc6HNRBbtFEUbCf',
			ETH: '0x9b941d7ae9a9b4cdf0b821105ccb0feaf10a8de1',
			BTC_URL: 'https://blockchain.info/rawaddr/',
			ETH_URL: 'https://api.blockcypher.com/v1/eth/main/addrs/',
			BTC_EXCHANGE_URL:
				'https://api.coindesk.com/v1/bpi/currentprice.json',
			ETH_EXCHANGE_URL:
				'https://api.etherscan.io/api?module=stats&action=ethprice',
			BTC_EXCHANGE: 0,
			ETH_EXCHANGE: 0,
			BTC_BALANCE: 0,
			ETH_BALANCE: 0,
			BTC_USD: 0,
			ETH_USD: 0,
			TRANSACTIONS: [
				{
					coin: 'ETH',
					value: 0.025,
					date: '11/19/2019',
				},
			],
		};
	}
	update = () => {
		BTC_EXCHANGE(this.state.BTC_EXCHANGE_URL).then(response => {
			console.log('Exchange rate : ' + response);
			this.setState({
				BTC_EXCHANGE: response,
			});
		});

		ETH_EXCHANGE(this.state.ETH_EXCHANGE_URL).then(response => {
			console.log('ETH Exchange rate : ' + response);
			this.setState({
				ETH_EXCHANGE: response,
			});
		});

		GET_BTC(this.state.BTC_URL, this.state.BTC).then(response => {
			console.log('BTC Balance : ' + response);
			this.setState({
				BTC_BALANCE: response,
			});
		});

		GET_ETH(this.state.ETH_URL, this.state.ETH).then(response => {
			console.log('ETH Balance : ' + response);
			this.setState({
				ETH_BALANCE: response,
			});
		});
	};

	// Update the balance every minute
	refresh = setInterval(this.update, 60000);

	componentDidMount() {
		this.update();
	}

	componentWillUnmount() {
		clearInterval(this.refresh);
	}

	render() {
		return (
			<div className="landing">
				<div className="grid">
					<NavBar page="Dashboard" />
					<h1 className="main_title">NoiseBridge Crypto</h1>

					<div className="graph">
						<div className="sub_title">Overview:</div>
						<br />
						<br />
						<Chart
							data={[
								0.25,
								0.26,
								0.29,
								0.45,
								0.52,
								0.89,
								0.99,
								0.85,
							]}
						/>
					</div>

					<div className="current_balance">
						<div className="eth">
							<div className="account_number">
								<Link to="/address">{this.state.ETH}</Link>
							</div>
							<div className="balance">
								ETH Balance: {this.state.ETH_BALANCE}{' '}
							</div>
							<div className="exchange_rate">
								ETH Exchange Rate: ${this.state.ETH_EXCHANGE}
							</div>
							<div className="usd_balance">
								ETH (USD): $
								{(
									this.state.ETH_BALANCE *
									this.state.ETH_EXCHANGE
								).toFixed(2)}{' '}
							</div>
						</div>
						<div className="btc">
							<div className="account_number">
							<Link to="/address">{this.state.BTC}</Link>
							</div>
							<div className="raw_balance">
								BTC Balance: {this.state.BTC_BALANCE}
							</div>
							<div className="exchange_rate">
								BTC Exchange Rate: ${this.state.BTC_EXCHANGE}
							</div>
							<div className="usd_balance">
								BTC (USD): $
								{(
									this.state.BTC_BALANCE *
									this.state.BTC_EXCHANGE
								).toFixed(2)}
							</div>
						</div>
					</div>
					<RecentTrans />
					<About />
				</div>
			</div>
		);
	}
}

export default Landing;
