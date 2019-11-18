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
		// let date = new Date(transactions.time);
		// let formatted_date =
		// 	date.getMonth() +
		// 	'/' +
		// 	date.getDay() +
		// 	'/' +
		// 	date.getFullYear() +
		// 	' at ' +
		// 	date.getHours() +
		// 	':' +
		// 	date.getMinutes();

		// console.log(date);
		return (
			<div className="transaction_div" key={transactions.tx_hash}>
				<div className="account_number">{transactions.address}</div>
				<div className="transaction_coin">{transactions.coin}</div>
				<div className="transaction_value">
					{' '}
					{transactions.value.toFixed(6)}
				</div>
				<div className="transaction_time">{transactions.time}</div>
				<div className="transaction_usd"> $</div>
			</div>
		);
	};

	componentDidMount() {
		let temp = this.props.transactions.map(this.map_transactions);
		this.setState({
			TransDiv: temp,
		});
	}

	componentDidUpdate(prevProps) {
		if (this.props.transactions !== prevProps.transactions) {
			let temp = this.props.transactions.map(this.map_transactions);
			this.setState({
				TransDiv: temp,
			});
		}
	}

	render() {
		return (
			<div className="RecentTrans">
				<div className="sub_title">Recent Transactions:</div>
				{this.state.TransDiv}
				<div className="view_all">
					<Link to="/transactions">View all transactions</Link>
				</div>
			</div>
		);
	}
}

export default Transactions;
