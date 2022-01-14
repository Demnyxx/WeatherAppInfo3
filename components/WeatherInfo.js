import React, {useState} from 'react'
import { View, Text , StyleSheet , Image} from 'react-native'
import {colors} from '../utils/index'

const {PRIMARY_COLOR , SECONDARY_COLOR} = colors

export default function WeatherInfo({currentWeather , currentWeatherDetails, cityName, unitsSystem}) {
    const {
        current: {temp, weather},
        lat,
        lon
        //weather: [details],
    } = currentWeatherDetails;

    const tempUnit = unitsSystem === 'metric' ? "C" : "F"
    const WEATHER_API_KEY = "97eb7d1ddf6b81b092cf2d15f3d5fd7c";
    const BASE_WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather?";
    const weatherUrl = `${BASE_WEATHER_URL}lat=${lat}&lon=${lon}&units=${unitsSystem}&appid=${WEATHER_API_KEY}&lang=fr`;
    const [ville, setVille] = useState(cityName);


    async function load() {
        
            //console.log("Before fetch")
            fetch(weatherUrl)
            .then(response => response.json())
            .then(data => {
                //console.log(data);
                setVille(data.name)
            })
            .catch(err => console.error(err));
    
        
     
    }
    
    if(cityName == 'UseGPSLocation'){
        
        //Recherche du nom de la ville pour affichage (champ name non dispo dans le résultat de l'appel de l'API avec forecast)
        //console.log(lat)
        //console.log(weatherUrl)
        //cityName = load()
        load();
        //console.log(ville)
        
    }

    
    const name = cityName == 'UseGPSLocation' ? `${ville}` : `${cityName}`

    const { icon , main , description} = weather[0]
    //console.log(weather)
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`
    return (
        <View style={styles.weatherInfo}>
            <Text style = {styles.textPrimary}>{name}</Text>
            <Image style = {styles.weatherIcon} source={{uri: iconUrl}} />
            <Text style = {styles.textPrimary} >{Math.round(temp)}°{tempUnit}</Text>
            <Text style = {styles.weatherDescription}>{description}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    weatherInfo: {
        alignItems: 'center'
    },
    weatherIcon:{
        width: 100,
        height: 100
    },
    weatherDescription: {
        textTransform: 'capitalize'
    },
    textPrimary: {
        fontSize: 30,
        color: PRIMARY_COLOR
    },
    textSecondary: {
        fontSize: 20,
        color: SECONDARY_COLOR,
        fontWeight: '500',
        marginTop: 10,
    },
})
