import React, {useContext, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {
  Container,
  Content,
  Footer,
  FooterTab,
  Text,
  Button,
  Form,
  Input,
  Icon,
  Grid,
  Col,
} from 'native-base';
import {globalStyles} from '../styles/global';
import {OrderContext} from '../context/orders/orderContext';
import {useNavigation} from '@react-navigation/native';
export const FormDish = () => {
  const [count, setCount] = useState(1);
  const [total, setTotal] = useState(0);
  const {dish, saveOrder} = useContext(OrderContext);
  const {price} = dish;
  const navigation = useNavigation();
  useEffect(() => {
    totalPrice();
  }, [count]);
  const totalPrice = () => {
    let total = count * price;
    setTotal(total);
  };
  const decrement = () => {
    if (count > 1) {
      const newCount = parseInt(count) - 1;
      setCount(newCount);
    }
  };
  const increment = () => {
    const newCount = parseInt(count) + 1;
    setCount(newCount);
  };
  const confirmOrder = () => {
    Alert.alert('Confirmar', 'Desea agregarlo al pedido?', [
      {text: 'Cancelar', style: 'cancel'},
      {
        text: 'Si',
        onPress: () => {
          const order = {...dish, count, total};
          saveOrder(order);
          navigation.replace('resumeOrder');
        },
      },
    ]);
  };
  return (
    <Container>
      <Content>
        <Form>
          <Text style={globalStyles.title}>Cantidad</Text>
          <Grid>
            <Col>
              <Button
                props
                block
                dark
                style={{height: 80, justifyContent: 'center'}}
                onPress={decrement}>
                <Icon style={{fontSize: 40}} name="remove" />
              </Button>
            </Col>
            <Col>
              <Input
                style={{fontSize: 30, textAlign: 'center'}}
                value={count.toString()}
                keyboardType="numeric"
                onChangeText={(n) => setCount(n)}
              />
            </Col>
            <Col>
              <Button
                block
                props
                dark
                style={{height: 80, justifyContent: 'center'}}
                onPress={increment}>
                <Icon style={{fontSize: 40}} name="add" />
              </Button>
            </Col>
          </Grid>
          <Text style={globalStyles.price}>Subtotal: ${total}</Text>
        </Form>
      </Content>
      <Footer>
        <FooterTab>
          <Button style={globalStyles.btn} onPress={confirmOrder}>
            <Text style={globalStyles.btnText}>Añadir al pedido</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};
