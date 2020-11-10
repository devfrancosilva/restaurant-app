import React, {useContext} from 'react';
import {Image} from 'react-native';
import {
  Container,
  Content,
  Text,
  Body,
  Button,
  Footer,
  FooterTab,
  Card,
  CardItem,
  H1,
} from 'native-base';
import {OrderContext} from '../context/orders/orderContext';
import {globalStyles} from '../styles/global';
import {useNavigation} from '@react-navigation/native';

export const DishDetails = () => {
  const {dish} = useContext(OrderContext);
  const {name, description, image, price} = dish;
  const navigation = useNavigation();
  return (
    <Container style={globalStyles.container}>
      <Content style={globalStyles.content}>
        <H1 style={globalStyles.title}>{name}</H1>
        <Card>
          <CardItem>
            <Body style={{alignItems: 'center'}}>
              <Image style={globalStyles.image} source={{uri: image}} />
              <Text style={{marginTop: 20}}>{description}</Text>
              <Text style={globalStyles.price}>Precio: ${price}</Text>
            </Body>
          </CardItem>
        </Card>
      </Content>
      <Footer>
        <FooterTab>
          <Button
            style={globalStyles.btn}
            onPress={() => navigation.navigate('formDish')}>
            <Text style={globalStyles.btnText}>Ordenar</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};
