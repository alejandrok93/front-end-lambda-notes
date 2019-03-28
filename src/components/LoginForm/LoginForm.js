import React from 'react';
import Login from './Login.js';
import Register from './Register.js';
import { Route, Link } from 'react-router-dom';

import './Login.css';

class LoginForm extends React.Component {
	constructor() {
		super();
		this.state = { activeTab: true, rightPanelActive: false };
	}
	changeTab() {
		this.setState({ activeTab: !this.state.activeTab });
	}

	handleClick = e => {
		let button = e.target.value;

		if (button === 'register') {
			this.setState({ rightPanelActive: true });
		} else if (button === 'login') {
			this.setState({ rightPanelActive: false });
		}
	};
	render() {
		return (
			<div
				id="container"
				className={`container ${
					this.state.rightPanelActive === false ? '' : 'register-form-active'
				}`}
			>
				{/* <Route exact path="/" component={Login} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/register" component={Register} /> */}

				<Login />
				<Register />
				<div className="overlay-container">
					<div className="overlay">
						<div className="overlay-panel overlay-left">
							<h1>Welcome Back!</h1>
							<p>Please log in with your username and password</p>
							<button
								onClick={this.handleClick}
								value="login"
								className="ghost login-button"
							>
								Login
							</button>
						</div>
						<div className="overlay-panel overlay-right">
							<h1>Hi there</h1>
							<p>Please create an account with a username and password</p>
							<button
								onClick={this.handleClick}
								value="register"
								className="ghost login-button"
							>
								Register
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default LoginForm;
