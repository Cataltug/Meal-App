import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { fetchMealsByCategories } from '../api/api';

export type Meal = {
    idMeal: string,
    strMeal: string,
    strMealThumb: string,
}

const CategoryMealsScreen = ({route, navigation}) => {
    const {category} = route.params;
    const [meals, setMeals] = useState<Meal[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      const getMeals = async () => {
        const data = await fetchMealsByCategories(category);
        setMeals(data);
        setLoading(false);
      }
      getMeals();
      
    }, [])
    
    if(loading) {
        return <ActivityIndicator size={"large"} color = {"dodgerblue"}/>
    }

  return (
    <FlatList
    data = {meals}
    keyExtractor={(item) => item.idMeal}
    renderItem={({item}) => (
        <TouchableOpacity onPress={() => navigation.navigate("Detail", {mealId: item.idMeal})}>
            <View style ={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
                <Image source={{uri: item.strMealThumb}} style={{width: 42,
              height: 42,
              marginRight: 12,}}/>
                <Text style= {{fontSize: 16}}>{item.strMeal}</Text>
            </View>
        </TouchableOpacity>
    )}
    />
  )
}

export default CategoryMealsScreen