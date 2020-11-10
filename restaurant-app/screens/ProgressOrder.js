import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Container, Text, H1, H3, Icon, Button} from 'native-base';
import {OrderContext} from '../context/orders/orderContext';
import firebase from '../firebase/firebase';
import {globalStyles} from '../styles/global';
import Countdown from 'react-countdown';
import {useNavigation} from '@react-navigation/native';
export const ProgressOrder = () => {
  const {orderId} = useContext(OrderContext);
  const [time, setTime] = useState(0);
  const [completed, setCompleted] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = () => {
    firebase.db.collection('ordenes').doc(orderId).onSnapshot(handleSnapshot);
  };
  const handleSnapshot = (snapshot) => {
    setTime(snapshot.data().deliveryTime);
    setCompleted(snapshot.data().complete);
  };
  const renderer = ({minutes, seconds}) => {
    return (
      <Text style={styles.time}>
        {minutes}:{seconds}
      </Text>
    );
  };
  return (
    <Container style={globalStyles.container}>
      <View style={[globalStyles.content, {marginTop: 50}]}>
        {time === 0 && (
          <>
            <Text style={{textAlign: 'center'}}>
              Hemos recibido tu orden...
            </Text>
            <Text style={{textAlign: 'center'}}>
              Estamos calculando el tiempo de entrega.
            </Text>
          </>
        )}
        {!completed && time > 0 && (
          <>
            <Text style={{textAlign: 'center'}}>Su orden estará lista en:</Text>
            <Text style={{textAlign: 'center'}}>
              <Countdown date={Date.now() + time * 60000} renderer={renderer} />
            </Text>
          </>
        )}
        {completed && (
          <>
            <H1 style={styles.completed}>Orden Lista</H1>
            <H3 style={styles.completed}>Puede retirar su pedido</H3>
            <Button
              style={globalStyles.btn}
              rounded
              block
              onPress={() => navigation.navigate('newOrder')}>
              <Text style={globalStyles.btnText}>Comenzar una nueva orden</Text>
            </Button>
          </>
        )}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  time: {
    fontSize: 60,
    textAlign: 'center',
    marginTop: 30,
  },
  completed: {
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: 20,
  },
});
