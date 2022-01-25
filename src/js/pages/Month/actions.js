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

export function addStartBal(monthId, balData) {
	return (dispatch) => {
		dispatch({
			type: types.ADD_START_BAL_START,
		});
		accountingApi
			.put(`/records/${monthId}`, balData)
			.then((res) => {
				dispatch({
					type: types.ADD_START_BAL_SUCCESS,
					payload: res.data,
				});
			})
			.catch((err) => {
				dispatch({
					type: types.ADD_START_BAL_FAILURE,
					payload: err.response.data,
				});
			});
	};
}

export function addRevenue(monthId, revData) {
	return (dispatch) => {
		dispatch({
			type: types.ADD_REVENUE_START,
		});
		accountingApi
			.put(`/records/revenue/${monthId}`, revData)
			.then((res) => {
				sessionStorage.setItem('records', JSON.stringify(res.data.records));
				sessionStorage.setItem('month', JSON.stringify(res.data.record));
				dispatch({
					type: types.ADD_REVENUE_SUCCESS,
					payload: res.data,
				});
			})
			.catch((err) => {
				dispatch({
					type: types.ADD_REVENUE_FAILURE,
					payload: err.response.data,
				});
			});
	};
}

export function addExpense(monthId, expData) {
	return (dispatch) => {
		dispatch({
			type: types.ADD_EXPENSE_START,
		});
		accountingApi
			.put(`/records/expense/${monthId}`, expData)
			.then((res) => {
				sessionStorage.setItem('records', JSON.stringify(res.data.records));
				sessionStorage.setItem('month', JSON.stringify(res.data.record));
				dispatch({
					type: types.ADD_EXPENSE_SUCCESS,
					payload: res.data,
				});
			})
			.catch((err) => {
				dispatch({
					type: types.ADD_EXPENSE_FAILURE,
					payload: err.response.data,
				});
			});
	};
}
