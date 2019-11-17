// Importing Dependencies
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Importing Components
import Landing from './pages/Landing';
import Address from './pages/Address';
import Transactions from './pages/Transactions';
import Testing from './pages/Testing'; 

// Importing Styling
import './App.css';

const App = () => {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/address" component={Address}/>
                    <Route exact path="/transactions" component={Transactions} />
                    <Route exact path="/testing" component={Testing} />
                    
                    <Route component={Landing} />
                </Switch>
            </Router>
        </div>
    );
};

export default App;
