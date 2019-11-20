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
import balances from '../balance.json';

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

        let date = [];
        let balance = [];
        for (let i = 0; i < balances.length; i++) {
            date.push(balances[i].date);
            balance.push(balances[i].balance);
        }
        console.log(date, balance);
        let temp = {
            SERIES: date,
            DATA: balance,
        };
        this.setState({
            GRAPH_DATA: temp,
        });
    }

    componentWillUnmount() {
        clearInterval(this.refresh);
    }

    render() {
        return (
            <div className="landing">
                <div className="grid">
                    <NavBar page="Dashboard" />
                    <h1 className="main_title">NoiseBridge Crypto Wallet</h1>

                    <div className="graph">
                        <div className="sub_title">Overview:</div>
                        <div className="total_balance">$
                            {(this.state.ETH_BALANCE * this.state.ETH_EXCHANGE +
                                this.state.BTC_BALANCE *
                                    this.state.BTC_EXCHANGE).toFixed(2)}
                        </div>
                        <br />
                        <br />
                        <Chart data={this.state.GRAPH_DATA} />
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
