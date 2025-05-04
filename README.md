# MealApp

- A React Native application that allows users to explore recipes from TheMealDB API, search for meals by name, filter by category, area, or first letter, and save favorite meals to Firebase Firestore.

## Features

- Browse Categories: View a list of meal categories.
- Category Meals: Tap a category to see all meals in that category.
- Alphabetical List: Filter meals by their first letter (A–Z).
- Regional List: Browse meals by area/region.
- Search: Search meals by name.
- Meal Details: View detailed recipe information, ingredients, and instructions.
- Favorites: Add or remove meals to your favorites. Favorites are persisted in Firebase Firestore.

### Screens Overview

- Home (HomeScreen)Displays buttons for alphabetical and regional filters, plus a list of all meal categories.
- Category Meals (CategoryMealsScreen)Shows meals for the selected category.
- Alphabetical List (AlphabetListScreen)Lists meals by the selected first letter.
- Area List (AreaListScreen)Lists meals filtered by selected region.
- Search (SearchScreen)Search recipes by keyword and navigate to details.
- Detail (DetailScreen)Shows full recipe details and toggle favorites.
- Likes (LikesScreen)Displays saved favorite meals with option to remove.

## Installation

### Clone the repository

- git clone https://github.com/Cataltug/Meal-App
- cd Meal-App

### Install dependencies

- npm install
-  or
- yarn install

### Configure environment variables
- Create a .env file in project root with your Firebase config values:

- FIREBASE_API_KEY=...
- FIREBASE_AUTH_DOMAIN=...
- FIREBASE_PROJECT_ID=...
- FIREBASE_STORAGE_BUCKET=...
- FIREBASE_MESSAGING_SENDER_ID=...
- FIREBASE_APP_ID=...

### Run the app
- npx react-native run-ios   # for iOS simulator
- npx react-native run-android  # for Android emulator/device

## Firebase Setup

- Create a Firebase project at https://console.firebase.google.com/
- Enable Firestore database and set up rules for your app.
- Copy your web app config and add to .env as shown above.
- App uses react-native-dotenv to load environment variables and Firestore SDK to persist favorites.

## Dependencies

- React Native
- React Navigation (Bottom Tabs & Native Stack)
- Axios
- Firebase (Firestore)
- react-native-dotenv

### License

- This project is licensed under the MIT License. Feel free to use, modify, and distribute.
