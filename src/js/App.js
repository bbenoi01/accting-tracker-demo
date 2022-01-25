import './app.css';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
	BrowserRouter as Router,
	Routes as Switch,
	Route,
	Navigate,
} from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
	faUserPlus,
	faSignInAlt,
	faPlusSquare,
	faPlusCircle,
	faArrowAltCircleLeft,
	faQuestionCircle,
	faCheckCircle,
	faTimesCircle,
	faUserLock,
} from '@fortawesome/free-solid-svg-icons';
import { login } from './pages/Auth/actions';

import Auth from './pages/Auth';
import Main from './pages/Main';
import Month from './pages/Month';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

library.add(
	fab,
	faUserPlus,
	faSignInAlt,
	faPlusSquare,
	faPlusCircle,
	faArrowAltCircleLeft,
	faQuestionCircle,
	faCheckCircle,
	faTimesCircle,
	faUserLock
);

const App = ({ dispatch, user, errors, month }) => {
	useEffect(() => {
		dispatch(login({ email: 'admin@admin.com', password: 'admin' }));
	}, [dispatch]);

	return (
		<Router>
			<Switch>
				<Route
					path='/'
					element={
						user ? <Navigate to='/main' replace /> : <Auth errors={errors} />
					}
				/>
				<Route path='/forgot-password' element={<ForgotPassword />} />
				<Route path='/reset-password/:id' element={<ResetPassword />} />
				<Route
					path='/main'
					element={user ? <Main /> : <Navigate to='/' replace />}
				/>
				<Route
					path={`/month/${month.month}`}
					element={user ? <Month month={month} /> : <Navigate to='/' replace />}
				/>
			</Switch>
		</Router>
	);
};

function mapStoreToProps(store) {
	return {
		user: store.auth.user,
		errors: store.auth.errors,
		month: store.main.month,
	};
}

export default connect(mapStoreToProps)(App);
