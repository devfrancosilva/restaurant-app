import React, {useContext} from 'react';
import {Button, Text} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {globalStyles} from '../../styles/global';
import {OrderContext} from '../../context/orders/orderContext';
export const ButtonResume = () => {
  const {order} = useContext(OrderContext);
  if (order.length === 0) return null;
  const navigation = useNavigation();
  return (
    <Button
      onPress={() => navigation.navigate('resumeOrder')}
      style={globalStyles.btn}>
      <Text style={globalStyles.btnText}>Ir a resumen</Text>
    </Button>
  );
};
