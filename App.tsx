import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { fetchCategories } from './src/api/api'
import { FavoritesProvider } from './src/stores/FavoritesContext'
import SampleScreen from './src/screens/SampleScreen'
import { NavigationContainer } from '@react-navigation/native'
import AppNavigator from './src/navigator/AppNavigator'

const App = () => {
  useEffect(() => {
    const getCategories = async () => {
      const categories = await fetchCategories();
    }
    getCategories();
  }, [])
  


  return (
    <FavoritesProvider>
      <NavigationContainer>
        <AppNavigator/>
      </NavigationContainer>
    </FavoritesProvider>
  )
}

export default App