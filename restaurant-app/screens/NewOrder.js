import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Container, Text, Button, Icon} from 'native-base';
import {globalStyles} from '../styles/global';
import {useNavigation} from '@react-navigation/native';
export const NewOrder = () => {
  const navigation = useNavigation();
  return (
    <Container style={globalStyles.container}>
      <View style={[globalStyles.content, styles.content]}>
        <Icon name="fast-food-outline" style={styles.icon} />
        <Button
          rounded
          block
          style={globalStyles.btn}
          onPress={() => navigation.navigate('Menu')}>
          <Text style={globalStyles.btnText}>Crear nueva orden</Text>
        </Button>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  icon: {
    fontSize: 200,
    marginBottom: -100,
    backgroundColor: '#FFDA00',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 30,
  },
});
