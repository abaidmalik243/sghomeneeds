import { fromJS } from 'immutable';
import { isEqual } from 'lodash';
import { CATEGORIES, GALLERIES, LISTINGS } from '../actions/restApi';
// import { galleries } from '../containers/GalleryPage/data';
import categories from '../containers/Common/categories.json';

const initialState = fromJS({
  [GALLERIES.MODEL]: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
  [LISTINGS.MODEL]: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
  categories,
});

export const GALLERY_VIEW = 'gallery';

export default function galleryReducer(state = initialState, action) {
  if (!isEqual(action.view, GALLERY_VIEW)) return state;
  switch (action.type) {
    case CATEGORIES.LIST.SUCCESS:
      return state.merge({
        categories: action.payload,
      });
    case GALLERIES.LIST.SUCCESS:
      return state.merge({
        galleries: action.payload,
      });
    case LISTINGS.LIST.SUCCESS:
      return state.merge({
        [LISTINGS.MODEL]: action.payload,
      });
    default:
      return state;
  }
}
