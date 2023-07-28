import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Login from './ClassLogin/Login'
import Reg from './ClassLogin/Reg'
import Product from './ClassProduct/Product'
import Category from './ClassProduct/Category'
import Account from './ClassProduct/Account'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Reg" component={Reg} />
        <Stack.Screen
          name="Home"
          component={Home}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Home() {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false, tabBarShowLabel: false,
      tabBarStyle: { height: 60, borderRadius: 10 }
    }}>
      <Tab.Screen name='Product' component={Product} options={{
        tabBarIcon: ({ focused }) => (
          <AntDesign name="CodeSandbox" size={30} color={focused ? 'green' : 'black'} />
        )
      }} />
      <Tab.Screen name='Category' component={Category} options={{
        tabBarIcon: ({ focused }) => (
          <AntDesign name="appstore-o" size={30} color={focused ? 'green' : 'black'} />
        )
      }} />
      <Tab.Screen name='Account' component={Account} options={{
        tabBarIcon: ({ focused }) => (
          <FontAwesome name="user-circle" size={30} color={focused ? 'green' : 'black'} />
        )
      }} />
    </Tab.Navigator>
  )
}