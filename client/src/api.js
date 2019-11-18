// BTC Exchange
const BTC_EXCHANGE = url => {
	console.log('Get BTC Exchange Rate');
	// BTC Exchange Rate
	return fetch(url, {
		mode: 'cors', // no-cors, *cors, same-origin	 
	})
		.then(response => {
			return response.json();
		})
		.then(data => {
			let result = data.bpi.USD.rate_float.toFixed(2);
			return result;
		})
		.catch(err => {
			console.log('Error Fetching BTC exchange rate');
			console.log(err);
		});
};

// ETH Exchange
const ETH_EXCHANGE = url => {
	// ETH Exchange Rate
	return fetch(url, {
		mode: 'cors', // no-cors, *cors, same-origin
	})
		.then(response => {
			return response.json();
		})
		.then(data => {
			let result = parseFloat(data.result.ethusd).toFixed(2);
			return result;
		})
		.catch(err => {
			console.log('Error Fetching ETH exchange rate');
			console.log(err);
		});
};

// GET BTC
const GET_BTC = (url, address) => {
	return fetch('https://cors-anywhere.herokuapp.com/' + url + address, {
		mode: 'cors', // no-cors, *cors, same-origin
	})
		.then(response => {
			return response.json();
		})
		.then(data => {
			let result = parseFloat(data.final_balance) / 100000000;
			return result;
		})
		.catch(err => {
			console.log('Error Fetching BTC');
			console.log(err);
		});
};

// GET ETH
const GET_ETH = (url, address) => {
	return fetch(url + address, {
		mode: 'cors', // no-cors, *cors, same-origin
	})
		.then(response => {
			return response.json();
		})
		.then(data => {
			let result = parseFloat(data.final_balance) / 1000000000000000000;
			return result;
		})
		.catch(err => {
			console.log('Error Fetching ETH');
			console.log(err);
		});
};

export { BTC_EXCHANGE, ETH_EXCHANGE, GET_BTC, GET_ETH };
