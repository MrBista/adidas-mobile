import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './Screens/HomeScreen';

import ProductsScreen from './Screens/ProductsScreen';
import DetailScreen from './Screens/DetailScreen';
import { ApolloProvider } from '@apollo/client';
import client from './config';
const StackProduct = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='List Shoe'
        component={ProductsScreen}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name='Detailed Shoe'
        component={DetailScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Products') {
                iconName = focused ? 'shirt' : 'shirt-outline';
              } else if (route.name === 'login') {
                iconName = focused ? 'person' : 'person-outline';
              } else if (route.name === 'checkout') {
                iconName = focused ? 'heart' : 'heart-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#000',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen
            options={{
              headerShown: false,
            }}
            name='Home'
            component={HomeScreen}
          />
          <Tab.Screen
            name='Products'
            component={StackProduct}
            options={{
              headerShown: false,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
