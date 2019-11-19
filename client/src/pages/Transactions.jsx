// Importing Dependencies
import React, { Component } from 'react';

// Importing Components
import NavBar from '../components/NavBar';
import RecentTrans from '../components/RecentTrans';

// Importing Styles
import './Transactions.css';

// Importing formulas
import { BTC_EXCHANGE, ETH_EXCHANGE, GET_BTC, GET_ETH } from '../api';

// Importing Wallets
import wallet from '../wallets.json';

class Transactions extends Component {
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

	render() {
		return (
			<div className="Transactions">
				<div className="grid">
					<NavBar page="Transactions" />
					<RecentTrans
						transactions={this.state.TRANSACTIONS}
						recent={false}
						BTC_EXCHANGE={this.state.BTC_EXCHANGE}
						ETH_EXCHANGE={this.state.ETH_EXCHANGE}
					/>
				</div>
			</div>
		);
	}
}

export default Transactions;
