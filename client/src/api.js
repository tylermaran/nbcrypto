const BTC_URL = 'https://api.blockcypher.com/v1/btc/main/addrs/';
const ETH_URL = 'https://api.blockcypher.com/v1/eth/main/addrs/';
const BTC_EXCHANGE_URL = 'https://api.coindesk.com/v1/bpi/currentprice.json';
const ETH_EXCHANGE_URL = 'https://api.etherscan.io/api?module=stats&action=ethprice';

// BTC Exchange
const BTC_EXCHANGE = () => {
	// BTC Exchange Rate
	return fetch(BTC_EXCHANGE_URL, {
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
const ETH_EXCHANGE = () => {
	// ETH Exchange Rate
	return fetch(ETH_EXCHANGE_URL, {
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
const GET_BTC = (address) => {
	const MAP_BTC = txrefs => {
		let value = parseFloat(txrefs.value) / 100000000;

		return {
			coin: 'BTC',
			tx_hash: txrefs.tx_hash,
			address: address,
			value: value,
			time: txrefs.confirmed,
		};
	};

	return fetch(BTC_URL + address, {
		mode: 'cors', // no-cors, *cors, same-origin
	})
		.then(response => {
			return response.json();
		})
		.then(data => {
			let transactions = data.txrefs.map(MAP_BTC);
			let balance = parseFloat(data.final_balance) / 100000000;
			let result = {
				transactions: transactions,
				balance: balance,
			};

			return result;
		})
		.catch(err => {
			console.log('Error Fetching BTC');
			console.log(err);
		});
};

// GET ETH
const GET_ETH = (address) => {
	const MAP_ETH = txrefs => {
		let value = parseFloat(txrefs.value) / 1000000000000000000;

		return {
			coin: 'ETH',
			tx_hash: txrefs.tx_hash,
			address: address,
			value: value,
			time: txrefs.confirmed,
		};
	};

	return fetch(ETH_URL + address, {
		mode: 'cors', // no-cors, *cors, same-origin
	})
		.then(response => {
			return response.json();
		})
		.then(data => {
			let transactions = data.txrefs.map(MAP_ETH);
			let balance = parseFloat(data.final_balance) / 1000000000000000000;
			let result = {
				transactions: transactions,
				balance: balance,
			};

			return result;
		})
		.catch(err => {
			console.log('Error Fetching ETH balance');
			console.log(err);
		});
};

export { BTC_EXCHANGE, ETH_EXCHANGE, GET_BTC, GET_ETH };
