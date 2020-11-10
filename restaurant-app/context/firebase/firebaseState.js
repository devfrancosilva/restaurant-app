import React, {useReducer} from 'react';
import {FirebaseContext} from './firebaseContext';
import {FirebaseReducer} from './firebaseReducer';
import firebase from '../../firebase/firebase';
import {GET_PRODUCTS} from '../../types';
import _ from 'lodash';
export const FirebaseState = (props) => {
  const initialState = {
    menu: [],
  };

  const [state, dispatch] = useReducer(FirebaseReducer, initialState);

  const getProducts = () => {
    firebase.db
      .collection('productos')
      .where('stock', '==', true)
      .onSnapshot(handleSnapShot);

    function handleSnapShot(snapshot) {
      let dishes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dishes = _.sortBy(dishes, 'category');
      dispatch({
        type: GET_PRODUCTS,
        payload: dishes,
      });
    }
  };
  return (
    <FirebaseContext.Provider value={{menu: state.menu, firebase, getProducts}}>
      {props.children}
    </FirebaseContext.Provider>
  );
};
