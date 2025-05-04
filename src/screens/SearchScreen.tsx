import { View, Text, TextInput, ActivityIndicator, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { Meal } from './CategoryMealsScreen';
import { fetchMealsBySearch } from '../api/api';



const SearchScreen = ({navigation}) => {
  const [query, setQuery] = useState("")
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const searchMeals = async () => {
    if(!query) {
      return;
    }
    setLoading(true);
    const results = await fetchMealsBySearch(query);
    setMeals(results);
    setLoading(false);
    setSearched(true);
  };

  return (
    <View style={{padding: 16}}>
      <TextInput placeholder="Search recipe..."
      value={query}
      onChangeText={(text) => setQuery(text)}
      editable = {!loading}
      onSubmitEditing={searchMeals}
      style={{borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 16, marginBottom: 16}}
      />
      {loading && <ActivityIndicator />}

      {!loading && searched && meals.length === 0 && (
        <Text>No result.</Text>
      )}
      <FlatList 
        data = {meals}
        keyExtractor={(item) => item.idMeal}
        renderItem={({item}) => (
          <TouchableOpacity onPress={()=> navigation.navigate("Home",{screen: "Detail", params: {mealId: item.idMeal}} )} >
            <View style={{flexDirection: "row", alignItems: "center", paddingVertical: 8}}>
              <Image source={{uri: item.strMealThumb}} style={{width:42, height:42, marginRight: 16}}/>
              <Text>{item.strMeal}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

export default SearchScreen