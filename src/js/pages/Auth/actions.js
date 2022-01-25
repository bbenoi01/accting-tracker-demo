import { types } from '../../types';
import accountingApi from '../../api/accountingApi';

export function register(userCredentials) {
	return (dispatch) => {
		dispatch({
			type: types.REGISTER_START,
		});
		accountingApi
			.post('/users/register', userCredentials)
			.then((res) => {
				const { token, ...others } = res.data;
				localStorage.setItem('token', token);
				localStorage.setItem('user', JSON.stringify(others));
				dispatch({
					type: types.REGISTER_SUCCESS,
					payload: others,
				});
			})
			.catch((err) => {
				dispatch({
					type: types.REGISTER_FAILURE,
					payload: err.response.data,
				});
			});
	};
}

export function login(userCredentials) {
	return (dispatch) => {
		dispatch({
			type: types.LOGIN_START,
		});
		accountingApi
			.post('/users/login', userCredentials)
			.then((res) => {
				const { token, ...others } = res.data.userData;
				const loginData = {
					user: others,
					records: res.data.userRecords,
				};
				localStorage.setItem('token', token);
				localStorage.setItem('user', JSON.stringify(others));
				sessionStorage.setItem('records', JSON.stringify(res.data.userRecords));
				dispatch({
					type: types.LOGIN_SUCCESS,
					payload: loginData,
				});
			})
			.catch((err) => {
				dispatch({
					type: types.LOGIN_FAILURE,
					payload: err.response.data,
				});
			});
	};
}
