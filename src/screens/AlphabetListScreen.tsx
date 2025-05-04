import { View, Text, TouchableOpacity, ScrollView, FlatList, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Meal } from './CategoryMealsScreen';
import { fetchAllMealsByFirstLetter } from '../api/api';

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const AlphabetListScreen = ({navigation}) => {
    const [selectedLetter, setSelectedLetter] = useState("A");
    const [meals, setMeals] = useState<Meal[]>([]);
    const [loading, setLoading] = useState(false);

    const getMealsByLetter = async (letter: string) => {
        setSelectedLetter(letter);
        setLoading(true)
        const result = await fetchAllMealsByFirstLetter(letter.toLowerCase());
        setMeals(result);
        setLoading(false);
    } 

    useEffect(() => {
      getMealsByLetter("A");
    }, [])
    

  return (
    <View style={{padding: 16, gap:16}}>
        <ScrollView horizontal showsHorizontalScrollIndicator contentContainerStyle= {{gap:8}}>
      {letters.map(letter => <TouchableOpacity style={{ backgroundColor: letter === selectedLetter ? "tomato" : "dodgerblue",
      padding: 8, borderRadius: 4}}
      onPress={() => getMealsByLetter(letter)}
      >
        <Text style={{color : "#fff"}}>{letter}</Text>
      </TouchableOpacity>)}
      </ScrollView>
      {loading && <ActivityIndicator/>}
      {!loading && meals.length === 0 && <Text>No recipe under letter {selectedLetter}.</Text>}

      <FlatList
      data = {meals}
      contentContainerStyle={{gap:8}}
      keyExtractor={(item) => item.idMeal}
      renderItem={({item}) => (
        <TouchableOpacity
        onPress={() => navigation.navigate("Detail", {mealId: item.idMeal})}
        style={{flexDirection: "row", alignItems:"center"}}
        >
            <Image source={{uri: item.strMealThumb}} style={{width: 50, height:50, borderRadius: 8,marginRight: 10}}/>
            <Text style={{fontSize:16}}>{item.strMeal}</Text>
        </TouchableOpacity>
      )}
      />
    </View>
  )
}

export default AlphabetListScreen