import { View, Text, ScrollView, Image, ActivityIndicator, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { fetchMealDetail } from '../api/api';
import { useFavorites } from '../stores/FavoritesContext';

export type Meal = {
  "dateModified": string, 
  "idMeal": string,
  "strArea": string,
  "strCategory": string,
  "strCreativeCommonsConfirmed": string,
  "strImageSource": string,
  "strIngredient1": string,
  "strIngredient10": string,
  "strIngredient11": string,
  "strIngredient12": string,
  "strIngredient13": string,
  "strIngredient14": string,
  "strIngredient15": string,
  "strIngredient16": string,
  "strIngredient17": string,
  "strIngredient18": string,
  "strIngredient19": string,
  "strIngredient2": string,
  "strIngredient20": string,
  "strIngredient3": string,
  "strIngredient4": string,
  "strIngredient5": string,
  "strIngredient6": string,
  "strIngredient7": string,
  "strIngredient8": string,
  "strIngredient9": string,
  "strInstructions": string,
  "strMeal": string,
  "strMealAlternate": string,
  "strMealThumb": string,
  "strMeasure1": string,
  "strMeasure10": string,
  "strMeasure11": string,
  "strMeasure12": string,
  "strMeasure13": string,
  "strMeasure14": string,
  "strMeasure15": string,
  "strMeasure16": string,
  "strMeasure17": string,
  "strMeasure18": string,
  "strMeasure19": string,
  "strMeasure2": string,
  "strMeasure20": string,
  "strMeasure3": string,
  "strMeasure4": string,
  "strMeasure5": string,
  "strMeasure6": string,
  "strMeasure7": string,
  "strMeasure8":string,
  "strMeasure9": string,
  "strSource": string,
  "strTags": string,
  "strYoutube": string,
}

const DetailScreen = ({ route }) => {
  const {mealId} = route.params;
  const [meal, setMeal] = useState<Meal| null>(null)
  const [loading, setLoading] = useState(true)
  const {favorites, addFavorite, removeFavorite} = useFavorites();
  const isFavorite = favorites.some((item) => item.idMeal === meal?.idMeal )

  useEffect(() => {
    const getMeal = async () => {
      const data = await fetchMealDetail(mealId);
      setMeal(data);
      setLoading(false);
    }
    getMeal();
    
  }, [])
  
  if(loading || !meal) {
    return <ActivityIndicator/>
  }


  return (
    <ScrollView contentContainerStyle={{padding: 16}}>
      <Image source={{uri: meal.strMealThumb}} style={{width: "100%", height: "200",borderRadius: 12}}/>
      <Button title = {isFavorite ? "Remove Favorites" : "Add Favorites"}
      onPress={() => isFavorite ? removeFavorite(meal.idMeal) : addFavorite(meal)}
      />
      <Text style={{fontSize: 22, fontWeight: "bold", marginTop: 16}}>{meal.strMeal}</Text>
      <Text style={{fontWeight: "600", marginVertical: 10}}>Category: {meal.strCategory}</Text>
      <Text style={{fontWeight: "600", marginBottom: 10}}>Region: {meal.strArea}</Text>
      <Text style={{fontSize: 18, fontWeight: "bold", marginBottom: 8}}>Ingredients:</Text>
      {Array.from({length: 20}).map((_,i) => {
        const ingredient = meal[`strIngredient${i+1}` as string];
        const measure = meal[`strMeasure${i+1}`];
        if(ingredient && ingredient.trim()) {
          return <Text key={i}>
            - {ingredient} {measure ? `(${measure})` : ""}
          </Text>
        }
      })}
      <Text style={{fontSize: 18, marginTop: 16, fontWeight:"bold"}}>Instructions: </Text>
      <Text style={{marginTop: 10}}>{meal.strInstructions} </Text>
    </ScrollView>
  );
};

export default DetailScreen