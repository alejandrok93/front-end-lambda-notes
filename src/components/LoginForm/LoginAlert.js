import React from 'react';

const LoginAlert = props => {
	return (
		<div className="login-alert">
			<p>{props.message}</p>
		</div>
	);
};

export default LoginAlert;
