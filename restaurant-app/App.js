import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {NewOrder} from './screens/NewOrder';
import {Menu} from './screens/Menu';
import {DishDetails} from './screens/DishDetails';
import {FormDish} from './screens/FormDish';
import {ProgressOrder} from './screens/ProgressOrder';
import {ResumeOrder} from './screens/ResumeOrder';
import {FirebaseState} from './context/firebase/firebaseState';
import {OrderState} from './context/orders/orderState';
import {ButtonResume} from './components/ui/ButtonResume';

const Stack = createStackNavigator();
const App = () => {
  return (
    <>
      <FirebaseState>
        <OrderState>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerStyle: {backgroundColor: '#FFDA00'},
                headerTitleStyle: {fontWeight: 'bold'},
                headerTitleAlign: 'center',
              }}>
              <Stack.Screen
                name="newOrder"
                component={NewOrder}
                options={{title: 'Nueva Orden'}}
              />
              <Stack.Screen
                name="Menu"
                component={Menu}
                options={{headerRight: (props) => <ButtonResume />}}
              />
              <Stack.Screen
                name="dishDetails"
                component={DishDetails}
                options={{title: 'Detalles del platillo'}}
              />
              <Stack.Screen
                name="formDish"
                component={FormDish}
                options={{title: 'Ordenar Platillo'}}
              />
              <Stack.Screen
                name="progressOrder"
                component={ProgressOrder}
                options={{title: 'Progreso Orden'}}
              />
              <Stack.Screen
                name="resumeOrder"
                component={ResumeOrder}
                options={{title: 'Resumen Pedido'}}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </OrderState>
      </FirebaseState>
    </>
  );
};

export default App;
