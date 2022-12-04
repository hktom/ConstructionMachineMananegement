import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Dashboard from './src/screen/Dashboard';
import {persistor, store} from './src/store/store';
import {Provider} from 'react-redux';
import EditCategory from './src/screen/category/edit';
import ManageCategory from './src/screen/category';
import CustomDrawerContent from './src/customDrawerContent';
import EditMachine from './src/screen/machine/edit';
import {PersistGate} from 'redux-persist/integration/react';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerHomeScreen = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="ManageCategory" component={ManageCategory} />
    </Drawer.Navigator>
  );
};

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={DrawerHomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="EditScreen" component={EditCategory} />
        <Stack.Screen name="EditMachine" component={EditMachine} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};

// export default () => {
//   return (
//     <Provider store={store}>
//       <App />
//     </Provider>
//   );
// };
