// Importing Dependencies
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Importing Styles
import './RecentTrans.css';

class Transactions extends Component {
	constructor(props) {
		super(props);
		this.state = {
			TransDiv: '',
		};
	}

	map_transactions = transactions => {
		let BTC_EXCHANGE = this.props.BTC_EXCHANGE;
		let ETH_EXCHANGE = this.props.ETH_EXCHANGE;

		let formatted_date = transactions.time
			.substring(0, transactions.time.length - 1)
			.split('T')
			.join(' : ');

		let USD = 0;
		switch (transactions.coin) {
			case 'BTC':
				USD = (transactions.value * BTC_EXCHANGE).toFixed(2);
				break;
			case 'ETH':
				USD = (transactions.value * ETH_EXCHANGE).toFixed(2);
				break;

			default:
				break;
		}
		return (
			<div className="transaction_div" key={transactions.tx_hash}>
				<div className="account_number">{transactions.address}</div>
				<div className="transaction_coin">{transactions.coin}</div>
				<div className="transaction_value">
					{' '}
					{transactions.value.toFixed(6)}
				</div>
				<div className="transaction_time">{formatted_date}</div>
				<div className="transaction_usd"> $ {USD}</div>
			</div>
		);
	};

	update_transactions = (transactions, recent) => {
		if (recent === true) {
			let short_list = transactions.slice(0, 9);
			let temp = short_list.map(this.map_transactions);
			this.setState({
				TransDiv: temp,
			});
		} else {
			let temp = transactions.map(this.map_transactions);
			this.setState({
				TransDiv: temp,
			});
		}
	};

	componentDidMount(prevProps) {
		this.update_transactions(this.props.transactions, this.props.recent);
	}

	componentDidUpdate(prevProps) {
		if (this.props !== prevProps) {
			this.update_transactions(
				this.props.transactions,
				this.props.recent
			);
		}
	}

	render() {
		let view_all = (
			<div className="view_all">
				<Link to="/transactions">View all transactions</Link>
			</div>
		);

		return (
			<div className="RecentTrans">
				<div className="sub_title">Recent Transactions:</div>
				{this.state.TransDiv}
				{this.props.recent ? view_all : <></>}
			</div>
		);
	}
}

export default Transactions;
