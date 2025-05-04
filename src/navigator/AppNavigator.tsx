import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import SearchScreen from '../screens/SearchScreen';
import LikesScreen from '../screens/LikesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import AlphabetListScreen from '../screens/AlphabetListScreen';
import AreaListScreen from '../screens/AreaListScreen';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => (
    <Stack.Navigator>
    <Stack.Screen
        name = "HomeMain"
        component={HomeScreen}
        options={{title: "Home"}}
    />
    <Stack.Screen
        name = "Detail"
        component={DetailScreen}
        options={{title: "Meal Details"}}
    />
    <Stack.Screen
        name = "CategoryMeals"
        component={CategoryMealsScreen}
        options={{title: "Recipes"}}
    />
    <Stack.Screen
        name = "AlphabetListScreen"
        component={AlphabetListScreen}
        options={{title: "Recipes"}}
    />
    <Stack.Screen
        name = "AreaListScreen"
        component={AreaListScreen}
        options={{title: "Recipes"}}
    />
    </Stack.Navigator>

)


const AppNavigator = () => {
  return (

      <Tab.Navigator>
        <Tab.Screen name = "Home" component={HomeStack} options={{headerShown: false}}/>
        <Tab.Screen name = "Search" component={SearchScreen}/>
        <Tab.Screen name = "Likes" component={LikesScreen}/>
      </Tab.Navigator>
  )
}

export default AppNavigator