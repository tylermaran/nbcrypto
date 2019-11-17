// Importing Dependencies
import React, { Component } from 'react';

// Importing Components
import NavBar from '../components/NavBar';
import About from '../components/About';
import RecentTrans from '../components/RecentTrans';

// Importing Styling
import './Landing.css';

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
		};
	}

	componentDidMount() {
		console.log('Fetch data');
		// BTC Value
		const refresh_values = () => {
			fetch(
				'https://cors-anywhere.herokuapp.com/' +
					this.state.BTC_URL +
					this.state.BTC,
				{
					mode: 'cors', // no-cors, *cors, same-origin
				}
			)
				.then(response => {
					return response.json();
				})
				.then(data => {
					console.log(data);
					let result = parseFloat(data.final_balance) / 100000000;
					this.setState({
						BTC_BALANCE: result,
					});
				})
				.catch(err => {
					console.log('Error Fetching BTC');
					console.log(err);
				});

			// ETH Balance
			fetch(this.state.ETH_URL + this.state.ETH, {
				mode: 'cors', // no-cors, *cors, same-origin
			})
				.then(response => {
					return response.json();
				})
				.then(data => {
					console.log(data);
					let result =
						parseFloat(data.final_balance) / 1000000000000000000;
					this.setState({
						ETH_BALANCE: result,
					});
				})
				.catch(err => {
					console.log('Error Fetching ETH');
					console.log(err);
				});

			// ETH Exchange Rate
			fetch(this.state.ETH_EXCHANGE_URL, {
				mode: 'cors', // no-cors, *cors, same-origin
			})
				.then(response => {
					return response.json();
				})
				.then(data => {
					console.log(data);
					let result = parseFloat(data.result.ethusd).toFixed(2);
					this.setState({
						ETH_EXCHANGE: result,
					});
				})
				.catch(err => {
					console.log('Error Fetching ETH exchange rate');
					console.log(err);
				});

			// BTC Exchange Rate
			fetch(this.state.BTC_EXCHANGE_URL, {
				mode: 'cors', // no-cors, *cors, same-origin
			})
				.then(response => {
					return response.json();
				})
				.then(data => {
					console.log(data);
					let result = data.bpi.USD.rate_float.toFixed(2);
					this.setState({
						BTC_EXCHANGE: result,
					});
				})
				.catch(err => {
					console.log('Error Fetching BTC exchange rate');
					console.log(err);
				});
		};
		refresh_values();

		setInterval(() => {
			refresh_values();
		}, 6000);
	}

	render() {
		return (
			<div className="landing">
				<div className="grid">
					<NavBar />
					<h1 className="main_title">NoiseBridge Crypto</h1>

					<div className="graph">
						<div className="sub_title">Overview:</div> 
						<br />
						<br/>
						<p>A really pretty graph will go here someday</p>
					</div>

					<div className="current_balance">
						<div className="eth">
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
