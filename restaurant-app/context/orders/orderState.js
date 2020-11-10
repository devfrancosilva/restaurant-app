import React, {useReducer} from 'react';
import {
  CONFIRM_ORDER,
  DELETE_PRODUCT,
  ORDER_PLACED,
  SELECT_DISH,
  SHOW_RESUME,
} from '../../types';
import {OrderContext} from './orderContext';
import {OrderReducer} from './orderReducer';

export const OrderState = (props) => {
  const initialState = {
    order: [],
    dish: null,
    resume: 0,
    orderId: '',
  };

  const [state, dispatch] = useReducer(OrderReducer, initialState);

  const selectDish = (dish) => {
    dispatch({
      type: SELECT_DISH,
      payload: dish,
    });
  };
  const saveOrder = (order) => {
    dispatch({
      type: CONFIRM_ORDER,
      payload: order,
    });
  };
  const showResume = (resume) => {
    dispatch({
      type: SHOW_RESUME,
      payload: resume,
    });
  };
  const deleteProduct = (id) => {
    dispatch({
      type: DELETE_PRODUCT,
      payload: id,
    });
  };
  const orderPlaced = (id) => {
    dispatch({
      type: ORDER_PLACED,
      payload: id,
    });
  };
  return (
    <OrderContext.Provider
      value={{
        order: state.order,
        selectDish,
        dish: state.dish,
        saveOrder,
        resume: state.resume,
        showResume,
        deleteProduct,
        orderPlaced,
        orderId: state.orderId,
      }}>
      {props.children}
    </OrderContext.Provider>
  );
};
