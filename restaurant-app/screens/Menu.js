import React, {useContext, useEffect} from 'react';
import {Fragment} from 'react';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  Container,
  Content,
  Separator,
  Text,
  List,
  ListItem,
  Thumbnail,
  Body,
} from 'native-base';
import {globalStyles} from '../styles/global';
import {FirebaseContext} from '../context/firebase/firebaseContext';
import {OrderContext} from '../context/orders/orderContext';
export const Menu = () => {
  const {getProducts, menu} = useContext(FirebaseContext);
  const {selectDish} = useContext(OrderContext);
  const navigation = useNavigation();
  useEffect(() => {
    getProducts();
  }, []);
  const showSeparator = (category, i) => {
    if (i > 0) {
      const categoryBefore = menu[i - 1].category;
      if (categoryBefore !== category) {
        return (
          <Separator style={styles.separator}>
            <Text style={styles.separatorText}>{category}</Text>
          </Separator>
        );
      }
    } else {
      return (
        <Separator style={styles.separator}>
          <Text style={styles.separatorText}>{category}</Text>
        </Separator>
      );
    }
  };
  return (
    <Container style={globalStyles.container}>
      <Content style={{backgroundColor: '#fff'}}>
        <List>
          {menu.map((dish, i) => {
            const {id, name, description, category, price, image} = dish;

            return (
              <Fragment key={id}>
                {showSeparator(category, i)}
                <ListItem
                  onPress={() => {
                    selectDish(dish);
                    navigation.navigate('dishDetails');
                  }}>
                  <Thumbnail large square source={{uri: image}} />
                  <Body>
                    <Text>{name}</Text>
                    <Text note numberOfLines={2}>
                      {description}
                    </Text>
                    <Text>Precio: ${price}</Text>
                  </Body>
                </ListItem>
              </Fragment>
            );
          })}
        </List>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  separator: {
    backgroundColor: '#000',
  },
  separatorText: {
    color: '#FFDA00',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
