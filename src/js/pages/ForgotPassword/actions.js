import { types } from '../../types';
import accountingApi from '../../api/accountingApi';

export function generateForgotPasswordToken(userData) {
	return (dispatch) => {
		dispatch({
			type: types.GENERATE_PASSWORD_TOKEN_START,
		});
		accountingApi
			.post('/users/forgot-password-token', userData)
			.then((res) => {
				dispatch({
					type: types.GENERATE_PASSWORD_TOKEN_SUCCESS,
					payload: res.data,
				});
			})
			.catch((err) => {
				dispatch({
					type: types.GENERATE_PASSWORD_TOKEN_FAILURE,
					payload: err.response.data,
				});
			});
	};
}
