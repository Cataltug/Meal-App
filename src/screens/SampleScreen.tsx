import { View, Text, SafeAreaView, Button } from 'react-native'
import React from 'react'
import { Meal, useFavorites } from '../stores/FavoritesContext'

const SampleScreen = () => {

    const {favorites, addFavorite, removeFavorite} = useFavorites();

    const sampleMeal: Meal = {
        idMeal: "1233",
        strMeal: "Chicken Curry",
        strMealThumb: "https://www.themealdb.com/images/media/meals/1520084413.jpg"
    };

  return (
    <SafeAreaView style={{flex: 1, marginTop: 20}}>
      <Text>Favorite Meals: {favorites.length}</Text>
      <Button title ="Add" onPress={() => addFavorite(sampleMeal)}></Button>
      <Button title ="Remove" onPress={() => removeFavorite(sampleMeal.idMeal)}></Button>
    </SafeAreaView>
  )
}

export default SampleScreen