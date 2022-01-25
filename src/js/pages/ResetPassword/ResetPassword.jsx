import './resetPassword.css';
import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { types } from '../../types';

import { resetPassword } from './actions';

const ResetPassword = ({ errors, success }) => {
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();
	const location = useLocation();
	const path = location.pathname.split('/')[2];

	const handleResetPassword = (e) => {
		e.preventDefault();
		const userData = {
			token: path,
			password,
		};

		dispatch(resetPassword(userData));
		document.getElementById('reset-password-form').reset();
		setPassword('');
	};

	return (
		<div className='reset-password'>
			<div className='card reset-password-card'>
				<div className='card-body'>
					<h2 className='card-title'>Reset Password</h2>
					<FontAwesomeIcon
						icon='user-lock'
						className='card-icon reset-password-card-icon'
					/>
					<form id='reset-password-form' onSubmit={handleResetPassword}>
						<div className='reset-password-form-container'>
							{errors?.token && (
								<div className='error-message'>
									<FontAwesomeIcon icon='times-circle' className='error-icon' />
									<b>{errors?.user}</b>
								</div>
							)}
							<input
								type='password'
								className='form-control reset-password-input'
								placeholder='Password'
								onChange={(e) => setPassword(e.target.value)}
								onFocus={
									success
										? () => dispatch({ type: types.CLEAR_SUCCESS })
										: errors
										? () => dispatch({ type: types.CLEAR_ERRORS })
										: null
								}
							/>
						</div>
						<button className='btn reset-password-btn'>Reset Password</button>
					</form>
				</div>
			</div>
		</div>
	);
};

function mapStoreToProps(store) {
	return {
		errors: store.rp.errors,
		success: store.rp.success,
	};
}

export default connect(mapStoreToProps)(ResetPassword);
