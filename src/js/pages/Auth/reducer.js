import { types } from '../../types';

const INITIAL_STATE = {
	user: JSON.parse(localStorage.getItem('user')) || null,
	records: JSON.parse(sessionStorage.getItem('records')) || [],
	loading: false,
	errors: {},
};

const authReducer = (state = INITIAL_STATE, action) => {
	const { type, payload } = action;

	switch (type) {
		case types.REGISTER_START: {
			return {
				...state,
				loading: true,
				errors: {},
			};
		}

		case types.REGISTER_SUCCESS: {
			return {
				...state,
				loading: false,
				user: payload,
				errors: {},
			};
		}

		case types.REGISTER_FAILURE: {
			return {
				...state,
				loading: false,
				errors: payload,
			};
		}

		case types.LOGIN_START: {
			return {
				...state,
				loading: true,
				errors: {},
			};
		}

		case types.LOGIN_SUCCESS: {
			return {
				...state,
				loading: false,
				user: payload.user,
				records: payload.records,
				errors: {},
			};
		}

		case types.LOGIN_FAILURE: {
			return {
				...state,
				loading: false,
				errors: payload,
			};
		}

		case types.ADD_REVENUE_START: {
			return {
				...state,
				loading: true,
				errors: {},
			};
		}

		case types.ADD_REVENUE_SUCCESS: {
			return {
				...state,
				loading: false,
				records: payload.records,
				errors: {},
			};
		}

		case types.ADD_REVENUE_FAILURE: {
			return {
				...state,
				loading: false,
				errors: payload,
			};
		}

		case types.ADD_EXPENSE_START: {
			return {
				...state,
				loading: true,
				errors: {},
			};
		}

		case types.ADD_EXPENSE_SUCCESS: {
			return {
				...state,
				loading: false,
				records: payload.records,
				errors: {},
			};
		}

		case types.ADD_EXPENSE_FAILURE: {
			return {
				...state,
				loading: false,
				errors: payload,
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
				records: payload.records,
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

		case types.GET_RECORDS_START: {
			return {
				...state,
				loading: true,
			};
		}

		case types.GET_RECORDS_SUCCESS: {
			return {
				...state,
				loading: false,
				records: payload,
				errors: {},
			};
		}

		case types.GET_RECORDS_FAILURE: {
			return {
				...state,
				loading: false,
				errors: payload,
			};
		}

		case types.CREATE_NEW_YEAR_SUCCESS: {
			return {
				...state,
				loading: false,
				records: payload,
				errors: {},
			};
		}

		case types.LOGOUT: {
			return {
				loading: false,
				user: null,
				errors: {},
			};
		}

		case types.CLEAR_ERRORS: {
			return {
				...state,
				errors: {},
			};
		}

		default:
			return state;
	}
};

export default authReducer;
