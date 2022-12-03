import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Dashboard from './src/screen/Dashboard';
import {store} from './src/store/store';
import {Provider} from 'react-redux';
import EditCategory from './src/screen/category/edit';
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="EditScreen" component={EditCategory} />
      </Stack.Navigator>
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
