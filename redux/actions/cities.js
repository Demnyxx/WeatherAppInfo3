import { ADD_CITY, REMOVE_CITY } from "../constants"

export function addCity(city) {
    return {
        type: ADD_CITY,
        value: city
    }
}

export function removeCity(cityIndex) {
    return {
        type: REMOVE_CITY,
        value: cityIndex
    }
}