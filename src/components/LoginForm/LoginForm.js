import React from 'react';
import Login from './Login.js';
import Register from './Register.js';
import { Route, Link } from 'react-router-dom';

import './Login.css';

class LoginForm extends React.Component {
	constructor() {
		super();
		this.state = { activeTab: true };
	}
	changeTab() {
		this.setState({ activeTab: !this.state.activeTab });
	}
	render() {
		return (
			<div className="form">
				<Route exact path="/" component={Login} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/register" component={Register} />
				{/* <Login /> */}
				<div className="login-tabs">
					<div
						onClick={e => this.changeTab()}
						className={`tab login ${this.state.activeTab ? 'selected' : ''}`}
					>
						<Link to="/login">LOGIN</Link>
					</div>
					<div
						onClick={e => this.changeTab()}
						className={`tab register ${this.state.activeTab ? '' : 'selected'}`}
					>
						<Link to="/register">REGISTER</Link>
					</div>
				</div>
			</div>
		);
	}
}

export default LoginForm;
