import { fromJS } from 'immutable';
import { USERS } from '../actions/restApi';
import { getToken } from '../utils/localStorage';

// Initial routing state
const initialState = fromJS({
  user: {},
  LOAD_AUTH: {
    data: {
      merchantId: -1,
      userId: -1,
      consumerId: -1,
    },
  },
  loginError: {},
  // initialize based on whether token exists in localStorage
  // LOAD_AUTH will be called on every page load by AuthRoute,
  // and will change this if token is invalid
  isLoggedIn: !!getToken(),
});

/**
 * Merge route into the global application state
 */
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    /* istanbul ignore next */
    case USERS.REGISTER.SUCCESS:
      return state.merge({
        user: action.payload,
        isLoggedIn: true,
      });
    case USERS.LOGIN.SUCCESS:
      return state.merge({
        user: action.payload,
        isLoggedIn: true,
      });
    case USERS.LOGIN.FAILED:
      return state.merge({
        loginError: action.payload,
        isLoggedIn: false,
      });
    case USERS.GET.SUCCESS:
      return state.merge({
        user: action.payload,
      });
    case USERS.PATCH.SUCCESS:
      return state.merge({
        user: action.payload,
      });
    case USERS.LOAD_AUTH.SUCCESS:
      return state.merge({
        LOAD_AUTH: action.payload,
        isLoggedIn: true,
      });
    case USERS.LOAD_AUTH.FAILED:
      return state.merge({
        loginError: action.payload,
        isLoggedIn: false,
      });
    case USERS.LOGOUT.SUCCESS:
      return state.merge({
        user: {},
        LOAD_AUTH: {
          data: {
            merchantId: 0,
            userId: 0,
            consumerId: 0,
          },
        },
        loginError: {},
        isLoggedIn: false,
      });
    default:
      return state;
  }
}
