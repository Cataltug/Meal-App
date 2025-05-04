import { View, Text, FlatList, TouchableOpacity, Image, Button } from 'react-native'
import React from 'react'
import { useFavorites } from '../stores/FavoritesContext'


const LikesScreen = ({navigation}) => {

  const {favorites, removeFavorite} = useFavorites();

  if(favorites.length === 0) {
    return (
    <View style= {{padding: 16}}>
      <Text>There is no favorite meal.</Text>
    </View>
    )
  }

  return (
    <FlatList
    data={favorites}
    keyExtractor={(item) => item.idMeal}
    renderItem={({item}) => (
      <TouchableOpacity onPress={()=> navigation.navigate("Home",{screen: "Detail", params: {mealId: item.idMeal}} )}>
        <View style={{flexDirection:"row", alignItems:"center", padding:16}}>
          <Image source={{uri: item.strMealThumb}} style={{width:42, height:42, marginRight:16 }}/>
          <View style={{flex:1}}>
            <Text>{item.strMeal}</Text>
          </View>
          <Button title ="Remove" onPress={()=> removeFavorite(item.idMeal)}/>
        </View>
      </TouchableOpacity>
    )}
    />
  )
}

export default LikesScreen