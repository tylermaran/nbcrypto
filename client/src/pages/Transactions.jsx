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
				<RecentTrans transactions={[1,3,45,6,3,2,5,6,3,2,2]} />
			</div>
		</div>
	);
};

export default Transactions;
