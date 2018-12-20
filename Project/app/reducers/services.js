import { fromJS } from 'immutable';
import { CATEGORIES, LISTINGS, MODEL_MAP } from '../actions/restApi';
import { getActionModel } from '../actions/apiUtil';

import categories from '../containers/Common/categories.json';

const initialState = fromJS({
  [CATEGORIES.MODEL]: {
    LIST: categories,
    GET: {},
    POST: {},
    GET_WITH_CHILDREN: {},
  },
  [LISTINGS.MODEL]: {
    LIST: {
      count: 250,
      next: null,
      previous: null,
      results: [],
    },
  },
});

export default function modelReducer(state = initialState, action) {
  const model = getActionModel(action.type);
  if (
    (model !== CATEGORIES.MODEL && model !== LISTINGS.MODEL) ||
    action.view !== 'services'
  ) {
    return state;
  }
  switch (action.type) {
    case MODEL_MAP[model].LIST.SUCCESS:
      return state.merge({
        [model]: state.get(model).merge({
          LIST: action.payload,
        }),
      });
    case MODEL_MAP[model].GET.SUCCESS:
    case MODEL_MAP[model].PUT.SUCCESS:
    case MODEL_MAP[model].PATCH.SUCCESS:
      return state.merge({
        [model]: state.get(model).merge({
          GET: action.payload,
        }),
      });
    case MODEL_MAP[model].POST.SUCCESS:
      return state.merge({
        [model]: state.get(model).merge({
          ...state[model],
          POST: action.payload,
        }),
      });
    case MODEL_MAP[CATEGORIES.MODEL].GET_WITH_CHILDREN.SUCCESS:
      return state.merge({
        [model]: state.get(model).merge({
          GET_WITH_CHILDREN: action.payload,
        }),
      });
    default:
      return state;
  }
}
