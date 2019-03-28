import React from 'react';
import axios from 'axios';
import LoginAlert from './LoginAlert';

class Login extends React.Component {
	constructor() {
		super();
		this.state = { username: '', password: '', isLoggingIn: false };
	}

	handleInput(e) {
		this.setState({ ...this.state, [e.target.name]: e.target.value });
	}

	handleSubmit(e) {
		e.preventDefault();
		this.setState({ isLoggingIn: true });
		const user = {
			username: this.state.username,
			password: this.state.password
		};
		if (!user.username || !user.password) {
			alert('Please sign in ');
		}
		const url =
			'https://lambda-notes-backend-project.herokuapp.com/api/users/login';
		axios
			.post(url, user)
			.then(response => {
				localStorage.setItem('jwt', response.data.token);
				window.location.reload();
			})
			.catch(err => {
				if (err.response.status === 400) {
					this.setState({ loginAlert: true });
				}
				console.log(err);
			});

		this.setState({ username: '', password: '' });
	}
	render() {
		return (
			<div className="form-container login-container">
				<form>
					<h1 className="form-title">Log in</h1>
					{this.state.loginAlert ? (
						<LoginAlert
							message={'There was an error with the username or password'}
						/>
					) : null}
					<input
						type="text"
						name="username"
						value={this.state.username}
						placeholder="Username"
						onChange={e => this.handleInput(e)}
					/>
					<input
						type="password"
						name="password"
						value={this.state.password}
						onChange={e => this.handleInput(e)}
						placeholder="Password"
					/>
					<button className="login-button" onClick={e => this.handleSubmit(e)}>
						{this.state.isLoggingIn === false ? 'Login' : 'Logging in....'}
					</button>
				</form>
			</div>
		);
	}
}

export default Login;
