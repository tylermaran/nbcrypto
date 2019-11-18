// BTC Exchange
const BTC_EXCHANGE = () => {
	console.log('Get BTC Exchange Rate');
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

// ETH Exchange
const ETH_EXCHANGE = () => {
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
};

// GET BTC
const GET_BTC = () => {
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
};

// GET ETH
const GET_ETH = () => {
	fetch(this.state.ETH_URL + this.state.ETH, {
		mode: 'cors', // no-cors, *cors, same-origin
	})
		.then(response => {
			return response.json();
		})
		.then(data => {
			console.log(data);
			let result = parseFloat(data.final_balance) / 1000000000000000000;
			this.setState({
				ETH_BALANCE: result,
			});
		})
		.catch(err => {
			console.log('Error Fetching ETH');
			console.log(err);
		});
};

export { BTC_EXCHANGE, ETH_EXCHANGE, GET_BTC, GET_ETH };
