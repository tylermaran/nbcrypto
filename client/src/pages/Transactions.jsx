// Importing Dependencies
import React from 'react';

// Importing Components
import NavBar from '../components/NavBar';
import RecentTrans from '../components/RecentTrans';

// Importing Styles
import './Transactions.css';

const Transactions = props => {
	return (
		<div className="Transactions">
			<div className="grid">
				<NavBar page="Transactions" />
				<RecentTrans/>
			</div>
		</div>
	);
};

export default Transactions;
