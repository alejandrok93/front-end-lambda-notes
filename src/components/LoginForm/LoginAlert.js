import React from 'react';

const LoginAlert = props => {
	return (
		<div className="login-alert">
			<p className="alert-message">{props.message}</p>
		</div>
	);
};

export default LoginAlert;
