// Importing Dependencies
import React from 'react';

// Importing Components
import NavBar from '../components/NavBar';

// Importing Styles
import './Transactions.css';

const Transactions = props => {
	return (
		<div className="Transactions">
			<div className="grid">
				<NavBar page="Transactions" />
				Transactions page
			</div>
		</div>
	);
};

export default Transactions;
