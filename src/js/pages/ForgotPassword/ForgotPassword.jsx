import './forgotPassword.css';
import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { types } from '../../types';

import { generateForgotPasswordToken } from './actions';

const ForgotPassword = ({ errors, success }) => {
	const [email, setEmail] = useState('');
	const dispatch = useDispatch();

	const handleForgotPasswordToken = (e) => {
		e.preventDefault();
		const userData = {
			email,
		};

		dispatch(generateForgotPasswordToken(userData));
		document.getElementById('forgot-password-form').reset();
		setEmail('');
	};

	return (
		<div className='forgot-password'>
			<div className='card forgot-password-card'>
				<div className='card-body'>
					<h2 className='card-title'>Forgot Password</h2>
					<FontAwesomeIcon
						icon='question-circle'
						className='card-icon forgot-password-card-icon'
					/>
					<form id='forgot-password-form' onSubmit={handleForgotPasswordToken}>
						<div className='forgot-password-form-container'>
							{success && (
								<div className='success-message'>
									<FontAwesomeIcon
										icon='check-circle'
										className='success-icon'
									/>
									<b>{success}</b>
								</div>
							)}
							{errors?.user && (
								<div className='error-message'>
									<FontAwesomeIcon icon='times-circle' className='error-icon' />
									<b>{errors?.user}</b>
								</div>
							)}
							<p className='forgot-password-form-text'>
								A link to reset your password will be sent to the email address
								associated with your account.
							</p>
							<input
								type='email'
								className='form-control forgot-password-input'
								placeholder='Email'
								onChange={(e) => setEmail(e.target.value)}
								onFocus={
									success
										? () => dispatch({ type: types.CLEAR_SUCCESS })
										: errors
										? () => dispatch({ type: types.CLEAR_ERRORS })
										: null
								}
							/>
						</div>
						<button className='btn forgot-password-btn'>Send Email</button>
						{errors?.token && (
							<div className='form-text error-message'>
								<b>{errors?.token}</b>
							</div>
						)}
					</form>
				</div>
			</div>
		</div>
	);
};

function mapStoreToProps(store) {
	return {
		errors: store.fp.errors,
		success: store.fp.success,
	};
}

export default connect(mapStoreToProps)(ForgotPassword);
