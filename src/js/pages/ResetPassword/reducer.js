import { types } from '../../types';

const INITIAL_STATE = {
	loading: false,
	errors: {},
};

const ResetPasswordReducer = (state = INITIAL_STATE, action) => {
	const { type, payload } = action;

	switch (type) {
		case types.RESET_PASSWORD_START: {
			return {
				...state,
				loading: true,
			};
		}

		case types.RESET_PASSWORD_SUCCESS: {
			return {
				...state,
				loading: false,
				success: payload,
			};
		}

		case types.RESET_PASSWORD_FAILURE: {
			return {
				...state,
				loading: false,
				errors: payload,
			};
		}

		case types.CLEAR_SUCCESS: {
			return {
				...state,
				success: undefined,
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

export default ResetPasswordReducer;
