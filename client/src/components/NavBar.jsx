// Importing Dependencies
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Importing Styles
import './NavBar.css';

class NavBar extends Component {
	componentDidMount() {
		console.log(this.props.page);

		switch (this.props.page) {
			case 'Dashboard':
				document.getElementById('Dashboard').classList.add('underline');
				break;
			case 'Address':
				document.getElementById('Address').classList.add('underline');
				break;
			case 'Transactions':
				document.getElementById('Transactions').classList.add('underline');
				break;
			default:
				break;
		}
	}

	render() {
		return (
			<div className="NavBar">
				<div className="nav_item">
					<Link to="/" id="Dashboard">
						Dashboard
					</Link>
				</div>
				<div className="nav_item">
					<Link to="/address" id="Address">
						Address
					</Link>
				</div>
				<div className="nav_item">
					<Link to="/transactions" id="Transactions">
						Transactions
					</Link>
				</div>
				<hr className="nav_line" />
			</div>
		);
	}
}

export default NavBar;
