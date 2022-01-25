import './auth.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { types } from '../../types';

import { register, login } from './actions';

const Auth = ({ errors }) => {
	const [authType, setAuthType] = useState('Login');
	const [handle, setHandle] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();
		let userCredintials = {};

		if (authType === 'Login') {
			userCredintials = {
				email,
				password,
			};
			dispatch(login(userCredintials));
		} else if (authType === 'Register') {
			userCredintials = {
				handle,
				email,
				password,
			};
			dispatch(register(userCredintials));
		}

		setHandle('');
		setEmail('');
		setPassword('');
	};

	const handleSwitchAuthType = () => {
		if (authType === 'Login') {
			setAuthType('Register');
		} else {
			setAuthType('Login');
			setHandle('');
		}
		dispatch({ type: types.CLEAR_ERRORS });
		setEmail('');
		setPassword('');
	};

	return (
		<div className='auth'>
			<div className='card auth-card'>
				<div className='card-body'>
					<h2 className='card-title'>{authType}</h2>
					{authType === 'Login' ? (
						<FontAwesomeIcon
							icon='sign-in-alt'
							className='card-icon auth-icon'
						/>
					) : (
						<FontAwesomeIcon icon='user-plus' className='card-icon auth-icon' />
					)}
					<form id='auth-form' onSubmit={handleSubmit}>
						<div className='auth-form-container'>
							{authType === 'Register' && (
								<>
									<input
										type='text'
										className='form-control auth-input'
										placeholder='Handle'
										value={handle}
										onChange={(e) => setHandle(e.target.value)}
										onFocus={() => dispatch({ type: types.CLEAR_ERRORS })}
									/>
									{errors?.handle && (
										<p className='error-message'>
											<b>{errors?.handle}</b>
										</p>
									)}
								</>
							)}
							<input
								type='email'
								className='form-control auth-input'
								placeholder='Email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								onFocus={() => dispatch({ type: types.CLEAR_ERRORS })}
							/>
							{errors?.email && (
								<p className='error-message'>
									<b>{errors?.email}</b>
								</p>
							)}
							<input
								type='password'
								className='form-control auth-input'
								placeholder='Password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								onFocus={() => dispatch({ type: types.CLEAR_ERRORS })}
							/>
							{errors?.password && (
								<p className='error-message'>
									<b>{errors?.password}</b>
								</p>
							)}
						</div>
						{errors?.general && (
							<p className='error-message'>
								<b>{errors?.general}</b>
							</p>
						)}
						<button type='submit' className='btn auth-submit'>
							Submit
						</button>
					</form>
					<Link to={'/forgot-password'} className='auth-forgot-password-link'>
						Forgot Password
					</Link>
				</div>
			</div>
			<button
				type='button'
				className='btn auth-switch'
				onClick={() => handleSwitchAuthType()}
			>
				{authType === 'Login' ? 'Register' : 'Login'}
			</button>
		</div>
	);
};

function mapStoreToProps(store) {
	return {
		errors: store.auth.errors,
	};
}

export default connect(mapStoreToProps)(Auth);
