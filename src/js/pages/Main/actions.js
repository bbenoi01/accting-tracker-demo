import { types } from '../../types';
import accountingApi from '../../api/accountingApi';

export function logout() {
	return (dispatch) => {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		sessionStorage.clear();
		dispatch({
			type: types.LOGOUT,
		});
	};
}

export function setMonth(month) {
	return (dispatch) => {
		sessionStorage.setItem('month', JSON.stringify(month));
		dispatch({
			type: types.SET_MONTH,
			payload: month,
		});
	};
}

export function getRecords(search) {
	return (dispatch) => {
		dispatch({
			type: types.GET_RECORDS_START,
		});
		accountingApi('/records' + search)
			.then((res) => {
				sessionStorage.setItem('records', JSON.stringify(res.data));
				dispatch({
					type: types.GET_RECORDS_SUCCESS,
					payload: res.data,
				});
			})
			.catch((err) => {
				dispatch({
					type: types.GET_RECORDS_FAILURE,
					payload: err.response.data,
				});
			});
	};
}

export function createNewYear(year) {
	return (dispatch) => {
		dispatch({
			type: types.CREATE_NEW_YEAR_START,
		});
		accountingApi
			.post(`/records/year/${year}`)
			.then((res) => {
				sessionStorage.setItem('records', JSON.stringify(res.data));
				dispatch({
					type: types.CREATE_NEW_YEAR_SUCCESS,
					payload: res.data,
				});
			})
			.catch((err) => {
				dispatch({
					type: types.CREATE_NEW_YEAR_FAILURE,
					payload: err.response.data,
				});
			});
	};
}
