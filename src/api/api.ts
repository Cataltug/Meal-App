import axios from "axios";

const API_URL = "https://www.themealdb.com/api/json/v1/1/";

export const fetchCategories = async () => {
    try {
        const response = await axios.get(`${API_URL}categories.php`)
        return response.data.categories;
    } catch (error) {
        console.error("Can not fetch categories. Error: ", error)
        return [];
    }
};

export const fetchMealsByCategories = async (category: string) => {
    try {
        const response = await axios.get(`${API_URL}filter.php?c=${category}`)
        return response.data.meals;
    } catch (error) {
        console.error("Can not fetch meals for ${category}. ", error)
        return [];
    }
}

export const fetchMealDetail = async (id: string) => {
    try {
        const response = await axios.get(`${API_URL}lookup.php?i=${id}`)
        return response.data.meals?.[0]
    } catch (error) {
        console.error("Can not fetch recipe detail: ", error)
        return null;
    }
}

export const fetchMealsBySearch = async (query: string) => {
    try {
        const response = await axios.get(`${API_URL}search.php?s=${query}`)
        return response.data.meals || [];
    } catch (error) {
        console.error("Error searching recipes:", error)
        return [];
    }
}

export const fetchAllMealsByFirstLetter = async (letter: string) => {
    try {
        const response = await axios.get(`${API_URL}search.php?f=${letter}`)
        return response.data.meals || [];
    } catch (error) {
        console.error(`Error searching recipes for letter ${letter}`, error)
        return [];
    }
}

export const fetchAreas = async () => {
    try {
        const response = await axios.get(`${API_URL}list.php?a=list`)
        return response.data.meals || [];
    } catch (error) {
        console.error(`Error fetching area`, error)
        return [];
    }
}

export const fetchMealsByAreas = async (area: string) => {
    try {
        const response = await axios.get(`${API_URL}filter.php?a=${area}`)
        return response.data.meals || [];
    } catch (error) {
        console.error(`Error searching recipes for Region ${area}`, error)
        return [];
    }
}

export default API_URL;