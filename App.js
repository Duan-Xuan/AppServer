import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Image } from "react-native"
import Login from './ClassLogin/Login'
import Reg from './ClassLogin/Reg'
import Product from './ClassProduct/Product'
import Category from './ClassProduct/Category'
import Account from './ClassProduct/Account'
import backdround from './assets/backdround2.png'
import box from './assets/box.png'
import category from './assets/category.png'
import account from './assets/account.png'

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
      headerShown: false, tabBarBackground: (focused) => {
        <Image source={{ focused: backdround }} />
      }
    }}>
      <Tab.Screen name='Product' component={Product} options={{
        tabBarIcon: (focused) => (
          <Image
            source={focused = box}
            style={{ width: 25, height: 25 }}
          />
        )
      }} />
      <Tab.Screen name='Category' component={Category} options={{
        tabBarIcon: (focused) => (
          <Image
            source={focused = category}
            style={{ width: 25, height: 25 }}
          />
        )
      }} />
      <Tab.Screen name='Account' component={Account} options={{
        tabBarIcon: (focused) => (
          <Image
            source={focused = account}
            style={{ width: 25, height: 25 }}
          />
        )
      }} />
    </Tab.Navigator>
  )
}