import { types } from '../../types';
import accountingApi from '../../api/accountingApi';

export function resetPassword(userData) {
	return (dispatch) => {
		dispatch({
			type: types.RESET_PASSWORD_START,
		});
		accountingApi
			.put('/users/reset-password', userData)
			.then((res) => {
				dispatch({
					type: types.RESET_PASSWORD_SUCCESS,
					payload: res.data,
				});
				window.location.replace('/');
			})
			.catch((err) => {
				dispatch({
					type: types.RESET_PASSWORD_FAILURE,
					payload: err.response.data,
				});
			});
	};
}
