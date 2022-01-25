import { types } from '../../types';

const INITIAL_STATE = {
	month: JSON.parse(sessionStorage.getItem('month')) || {},
};

const MainReducer = (state = INITIAL_STATE, action) => {
	const { type, payload } = action;

	switch (type) {
		case types.SET_MONTH: {
			return {
				...state,
				month: payload,
			};
		}

		case types.CLEAR_MONTH: {
			return {
				...state,
				month: {},
			};
		}

		case types.ADD_REVENUE_SUCCESS: {
			return {
				...state,
				month: payload.record,
			};
		}

		case types.ADD_EXPENSE_SUCCESS: {
			return {
				...state,
				month: payload.record,
			};
		}

		case types.ADD_START_BAL_START: {
			return {
				...state,
				loading: true,
				errors: {},
			};
		}

		case types.ADD_START_BAL_SUCCESS: {
			return {
				...state,
				loading: false,
				month: payload.record,
				errors: {},
			};
		}

		case types.ADD_START_BAL_FAILURE: {
			return {
				...state,
				loading: false,
				errors: payload,
			};
		}

		case types.CREATE_NEW_YEAR_START: {
			return {
				...state,
				loading: true,
			};
		}

		case types.CREATE_NEW_YEAR_FAILURE: {
			return {
				...state,
				loading: false,
				errors: payload,
			};
		}

		case types.LOGOUT: {
			return {
				month: {},
			};
		}

		default:
			return state;
	}
};

export default MainReducer;
