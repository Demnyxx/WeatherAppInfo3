import React from 'react'
import { View, Text , StyleSheet , Image} from 'react-native'
import {colors} from '../utils/index'

const {PRIMARY_COLOR , SECONDARY_COLOR} = colors

export default function WeatherInfo({currentWeather , currentWeatherDetails, cityName}) {
    const {
        main: {temp},
        weather: [details],
    } = currentWeatherDetails;
    const name = cityName == 'UseGPSLocation' ? `${currentWeatherDetails.name}` : `${cityName}`
    const { icon , main , description} = details

    const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`
    return (
        <View style={styles.weatherInfo}>
            <Text style = {styles.textPrimary}>{name}</Text>
            <Image style = {styles.weatherIcon} source={{uri: iconUrl}} />
            <Text style = {styles.textPrimary} >{temp}°</Text>
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
