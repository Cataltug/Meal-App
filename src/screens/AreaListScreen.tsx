import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Meal } from './CategoryMealsScreen';
import { fetchAreas, fetchMealsByAreas } from '../api/api';


type Area = {
    strArea : string;
}

const AreaListScreen = ({navigation}) => {
    const [areas, setAreas] = useState<Area[]>([]);
    const [selectedArea, setSelectedArea] = useState("American");
    const [meals, setMeals] = useState<Meal[]>([])
    const [loading, setLoading] = useState(false);

    const loadAreas = async () => {
        const data = await fetchAreas();
        setAreas(data);
    }

    const loadMealsByArea = async(area: string) => {
        setSelectedArea(area);
        setLoading(true);
        const data = await fetchMealsByAreas(area);
        setMeals(data);
        setLoading(false);

    }

    useEffect(() => {
      loadAreas();
      loadMealsByArea("American");
    }, [])
    

  return (
    <View>
      <Text>Select Region</Text>
      <FlatList 
      horizontal
      contentContainerStyle = {{gap: 16,}}
      data = {areas}
      keyExtractor={(item) => item.strArea}
      renderItem={({item}) => (
        <TouchableOpacity onPress={() => loadMealsByArea(item.strArea)}>
            <Text style = {{
                fontSize: 16,
                color: selectedArea === item.strArea ? "orange" : "gray"
            }}>{item.strArea}</Text>
        </TouchableOpacity>
      )}
      />
        {loading && <ActivityIndicator/>}
        {!loading && meals.length === 0 && <Text>No recipe under letter {selectedArea}.</Text>}
      <FlatList
        contentContainerStyle = {{
            paddingTop: 8,
            gap: 16
        }}
        data = {meals}
        keyExtractor={(item) => item.idMeal}
        renderItem={({item}) => (
            <TouchableOpacity
            onPress={() => navigation.navigate("Detail", {mealId: item.idMeal})}
            style= {{
                flexDirection: "row",
                gap: 8,
                alignItems: "center"
            }}>
                <Image
                style = {{width: 50, height: 50}}
                source={{uri: item.strMealThumb}}/>
                <Text>{item.strMeal}</Text>
            </TouchableOpacity>
        )}
       />
    </View>
  )
}

export default AreaListScreen