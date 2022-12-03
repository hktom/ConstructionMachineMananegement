import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Dashboard from './src/screen/Dashboard';
import {store} from './src/store/store';
import {Provider} from 'react-redux';
import EditCategory from './src/screen/category/edit';
import ManageCategory from './src/screen/category';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="EditScreen" component={EditCategory} />
      </Stack.Navigator>

      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="ManageCategory" component={ManageCategory} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
