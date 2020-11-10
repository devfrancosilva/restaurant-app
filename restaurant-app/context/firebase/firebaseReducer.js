import {GET_PRODUCTS} from '../../types';

export const FirebaseReducer = (state, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        menu: action.payload,
      };
    default:
      return state;
  }
};
