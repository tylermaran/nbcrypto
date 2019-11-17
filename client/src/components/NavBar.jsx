// Importing Dependencies
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Importing Styles
import './NavBar.css';

const NavBar = props => {
	const [page, setPage ] = useState('Dashboard');

	return (
		<div className="NavBar">
			<div className="nav_item">
				<Link to="/">Dashboard</Link>
			</div>
			<div className="nav_item">
				<Link to="/address">Address</Link>
			</div>
			<div className="nav_item">
				<Link to="/transactions">Transactions</Link>
			</div>
            <hr className="nav_line"/>
		</div>
	);
};

export default NavBar;
