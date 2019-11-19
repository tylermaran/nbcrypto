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
import wallet from '../wallets.json';

// Coinbase account: ignoring this one for now
// {
// 	"coin": "BTC",
// 	"address": "1NrbWrxkdPuyPfFtc1W4AKNtkQMyXwAAJV",
// 	"note": "Bitcoin Coinbase Account (cold-storage)"
// }

class Landing extends Component {
	constructor(props) {
		super(props);
		this.state = {
			BTC: [],
			ETH: [],
			BTC_EXCHANGE: 0,
			ETH_EXCHANGE: 0,
			BTC_BALANCE: 0,
			ETH_BALANCE: 0,
			BTC_USD: 0,
			ETH_USD: 0,
			TRANSACTIONS: [],
			ETH_TRANSACTIONS: [],
			BTC_TRANSACTIONS: [],
			GRAPH_DATA: {
				DATA: [],
				SERIES: [],
			},
		};
	}
	update = () => {
		BTC_EXCHANGE().then(response => {
			console.log('BTC Exchange Rate: ' + response);
			this.setState({
				BTC_EXCHANGE: response,
			});
		});

		ETH_EXCHANGE().then(response => {
			console.log('ETH Exchange Rate: ' + response);
			this.setState({
				ETH_EXCHANGE: response,
			});
		});

		if (this.state.BTC.length > 0) {
			for (let i = 0; i < this.state.BTC.length; i++) {
				GET_BTC(this.state.BTC[i])
					.then(response => {
						let all_transactions = this.state.TRANSACTIONS;

						if (
							response.transactions.length >
							this.state.BTC_TRANSACTIONS
						) {
							for (
								let i = 0;
								i < response.transactions.length;
								i++
							) {
								all_transactions.push(response.transactions[i]);
							}
							this.setState(
								{
									BTC_BALANCE: response.balance,
									TRANACTIONS: all_transactions,
									BTC_TRANSACTIONS: response.transactions,
								},
								() => {
									let temp = this.state.TRANSACTIONS;
									temp.sort((a, b) =>
										a.time > b.time ? -1 : 1
									);
									this.populate_graph();
								}
							);
						}
					})
					.catch(error => {
						console.log('Error Fetching BTC Balance');
						console.log(error);
					});
			}
		}

		if (this.state.ETH.length > 0) {
			for (let i = 0; i < this.state.BTC.length; i++) {
				GET_ETH(this.state.ETH[i])
					.then(response => {
						let all_transactions = this.state.TRANSACTIONS;

						if (
							response.transactions.length >
							this.state.ETH_TRANSACTIONS
						) {
							for (
								let i = 0;
								i < response.transactions.length;
								i++
							) {
								all_transactions.push(response.transactions[i]);
							}
							this.setState(
								{
									ETH_BALANCE: response.balance,
									TRANACTIONS: all_transactions,
									ETH_TRANSACTIONS: response.transactions,
								},
								() => {
									let temp = this.state.TRANSACTIONS;
									temp.sort((a, b) =>
										a.time > b.time ? -1 : 1
									);
								}
							);
						}
					})
					.catch(error => {
						console.log('Error Fetching ETH Balance');
						console.log(error);
					});
			}
		}
	};

	// Update the balance every minute
	refresh = setInterval(this.update, 60000);

	componentDidMount() {
		for (let i = 0; i < wallet.wallets.length; i++) {
			let temp;
			switch (wallet.wallets[i].coin) {
				case 'ETH':
					temp = this.state.ETH;
					temp.push(wallet.wallets[i].address);
					this.setState({
						ETH: temp,
					});
					break;
				case 'BTC':
					temp = this.state.BTC;
					temp.push(wallet.wallets[i].address);
					this.setState({
						BTC: temp,
					});
					break;
				default:
					break;
			}
		}
		this.update();
	}

	componentWillUnmount() {
		clearInterval(this.refresh);
	}

	populate_graph() {
		// No idea what I'm doing here
		const firstDate = new Date(2019, 6, 1);
		const secondDate = Date(Date.now());

		console.log('First: ' + firstDate);
		console.log('Second: ' + secondDate);
		if (this.state.TRANSACTIONS.length > 0) {
			console.log('Loop through tranactions');
			for (let i = 0; i < this.state.TRANSACTIONS.length; i++) {
				console.log(new Date(this.state.TRANSACTIONS[i].time));
			}

			let now = new Date();
			let balance = 0;
			for (
				var d = new Date(2012, 0, 1);
				d <= now;
				d.setDate(d.getDate() + 1)
			) {
				console.log(new Date(d));

				// daysOfYear.push(new Date(d));
			}
		}
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
					<RecentTrans
						transactions={this.state.BTC_TRANSACTIONS}
						recent={true}
						BTC_EXCHANGE={this.state.BTC_EXCHANGE}
						ETH_EXCHANGE={this.state.ETH_EXCHANGE}
					/>
					<About />
				</div>
			</div>
		);
	}
}

export default Landing;
