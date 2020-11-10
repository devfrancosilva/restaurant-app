import React, {useContext, useEffect} from 'react';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  Container,
  Content,
  Body,
  List,
  ListItem,
  Text,
  Thumbnail,
  Footer,
  FooterTab,
  Left,
  H1,
  Button,
} from 'native-base';
import {globalStyles} from '../styles/global';
import {OrderContext} from '../context/orders/orderContext';
import firebase from '../firebase/firebase';
export const ResumeOrder = () => {
  const {order, resume, showResume, deleteProduct, orderPlaced} = useContext(
    OrderContext,
  );
  const navigation = useNavigation();
  useEffect(() => {
    calculateResume();
  }, [order]);
  const calculateResume = () => {
    let total = order.reduce((acc, dish) => acc + dish.total, 0);
    showResume(total);
  };
  const confirmResume = () => {
    Alert.alert('Confirmar', 'Desea confirmar el pedido?', [
      {text: 'Cancelar', style: 'cancel'},
      {
        text: 'Si',
        onPress: async () => {
          const finalOrderObj = {
            deliveryTime: 0,
            complete: false,
            resume: Number(resume),
            order,
            create: Date.now(),
          };
          try {
            const finalOrder = await firebase.db
              .collection('ordenes')
              .add(finalOrderObj);
            orderPlaced(finalOrder.id);
            navigation.replace('progressOrder');
          } catch (error) {
            console.log(error);
          }
        },
      },
    ]);
  };
  const handleDelete = (id) => {
    Alert.alert('Eliminar', 'Seguro desea eliminar el producto?', [
      {text: 'Cancelar', style: 'cancel'},
      {
        text: 'Si',
        onPress: () => {
          deleteProduct(id);
        },
      },
    ]);
  };
  return (
    <Container style={globalStyles.container}>
      <Content style={globalStyles.content}>
        <H1 style={globalStyles.title}>Resumen</H1>
        {order.map((dish, i) => {
          const {name, price, id, count, image} = dish;

          return (
            <List key={id + i}>
              <ListItem thumbnail>
                <Left>
                  <Thumbnail large square source={{uri: image}} />
                </Left>
                <Body>
                  <Text>{name}</Text>
                  <Text>Cantidad: {count}</Text>
                  <Text>Precio: ${price}</Text>
                </Body>
                <Button danger onPress={() => handleDelete(id)}>
                  <Text>X</Text>
                </Button>
              </ListItem>
            </List>
          );
        })}
        <Text style={globalStyles.price}>Total a pagar ${resume}</Text>
        <Button full dark onPress={() => navigation.navigate('Menu')}>
          <Text>Seguir pidiendo</Text>
        </Button>
      </Content>
      <Footer>
        <FooterTab>
          <Button style={globalStyles.btn} onPress={confirmResume}>
            <Text style={globalStyles.btnText}>Finalizar pedido</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};
