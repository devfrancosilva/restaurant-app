import {
  CONFIRM_ORDER,
  DELETE_PRODUCT,
  ORDER_PLACED,
  SELECT_DISH,
  SHOW_RESUME,
} from '../../types';

export const OrderReducer = (state, action) => {
  switch (action.type) {
    case SELECT_DISH:
      return {
        ...state,
        dish: action.payload,
      };
    case CONFIRM_ORDER:
      return {
        ...state,
        order: [...state.order, action.payload],
      };
    case SHOW_RESUME:
      return {
        ...state,
        resume: action.payload,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        order: state.order.filter((product) => product.id !== action.payload),
      };
    case ORDER_PLACED:
      return {
        ...state,
        order: [],
        resume: 0,
        orderId: action.payload,
      };
    default:
      return state;
  }
};
