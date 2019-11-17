exports.handler = async (event, context) => {

    const fetch = require('node-fetch');
    const BTC = '37VhBhZGbmFAgHZJunHVc6HNRBbtFEUbCf';
    const ETH = '0x9b941d7ae9a9b4cdf0b821105ccb0feaf10a8de1';
    
    const BTC_URL = 'https://blockchain.info/rawaddr/'
    const ETH_URL = 'https://api.blockcypher.com/v1/eth/main/addrs/'
    
    let responseCode = 200;
    
    return fetch(BTC_URL + BTC)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            
            let parsed_data = {
                total_BTC_received: data.total_received,
                total_BTC_sent: data.total_sent,
                final_balance: data.final_balance
            }
            
            let responseBody = {
                message: 'Welcome to the NoiseBridge Crypto Tracker',
                data: parsed_data
            }
            
            let response = {
                statusCode: responseCode,
                isBase64Encoded: true,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(responseBody)
            };
            console.log("response: " + JSON.stringify(response));
            return response;
        })
        .catch(err => {
            console.log('Something broke')
            console.log(err);
            return {
                statusCode: 500,
                headers: {},
                body: {
                    error: err
                }
            }
        });
}
