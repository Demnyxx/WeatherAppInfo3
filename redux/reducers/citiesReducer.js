import { ADD_CITY, REMOVE_CITY } from "../constants";

const initialState = {
    cities: []
};

function checkId(city){
    return city.id == this
}
const citiesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CITY:
            //Test doublons
            if(state.cities.findIndex(checkId, action.value.id) == -1)
            {
                return {
                    ...state,
                    cities: [...state.cities, action.value],                
                };
            }
              

        case REMOVE_CITY:
            return {
                ...state,
                cities: state.cities.filter((elem, index) => index != action.value)
            };
        default:
            return state;
    }
}
export default citiesReducer;