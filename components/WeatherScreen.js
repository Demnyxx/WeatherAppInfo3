import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View , ActivityIndicator, ScrollView } from "react-native";
import * as Location from "expo-location";
import WeatherInfo from './WeatherInfo'
import UnitsPicker from './UnitsPicker'
import ReloadIcon from './ReloadIcon'
import WeatherDetails from './WeatherDetails'
import {colors} from '../utils/index'
import DailyForecast from "./DailyForecast";
import styled from "styled-components/native";


const WEATHER_API_KEY = "97eb7d1ddf6b81b092cf2d15f3d5fd7c";
//const BASE_WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather?";
const BASE_WEATHER_URL = "https://api.openweathermap.org/data/2.5/onecall?";


export default function WeatherScreen({ navigation, route }) {
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [currentWeatherDetails, setCurrentWeatherDetails] = useState(null);

  //Système d'affichage des unités par défaut
  const [unitsSystem , setUnitsSystem] = useState('metric')
  const [unitsText, setUnitsText] = useState('C')

  //Variables récupérées du composant de choix de ville
  let latitude = route.params.latitude;
  let longitude = route.params.longitude;
  const city = route.params.cityName

  useEffect(() => {
    load();
  }, [unitsSystem]);
  async function load() {
    setCurrentWeatherDetails(null)
    setCurrentWeather(null)
    setErrorMessage(null)
    try {
      if(city == 'UseGPSLocation')
      {
        /* N'utilise pas la ville choisie, localisation directe */
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status != "granted") {
          setErrorMessage("Vous devez autoriser la localisation pour utiliser l'application.");
          return;
        }
        const location = await Location.getCurrentPositionAsync();
        latitude = location.coords.latitude
        longitude = location.coords.longitude

      }
     
      

      //const { latitude, longitude, city } = route.params;
      //const weatherUrl = `${BASE_WEATHER_URL}lat=${JSON.stringify(latitude)}&lon=${JSON.stringify(longitude)}&units=${unitsSystem}&appid=${WEATHER_API_KEY}&lang=fr`;
      const weatherUrl = `${BASE_WEATHER_URL}lat=${JSON.stringify(latitude)}&lon=${JSON.stringify(longitude)}&exclude=minutely,hourly,alerts&units=${unitsSystem}&appid=${WEATHER_API_KEY}&lang=fr`;
      const response = await fetch(weatherUrl)
      const result = await response.json()
      
      let temp = unitsSystem === 'metric' ? "C" : "F"
      setUnitsText(temp)

      if(response.ok){
        //fetch réussi
        setCurrentWeather(result.current.temp)
        setCurrentWeatherDetails(result)
        console.log(weatherUrl)
      }
      else {
        //Erreur de fetch
        setErrorMessage(result.message)
      }

    } catch (error) {
      //Exception lors de l'exécution
      setErrorMessage(error.message)
    }


  }
  if(currentWeatherDetails){

    //const  {main : temp} = currentWeather
    return (
      <View style={styles.container}>
        
        <StatusBar style="auto" />
        <View style={[styles.main], {flex: 3, marginTop: 20}}>
          <UnitsPicker unitsSystem={unitsSystem} setUnitsSystem={setUnitsSystem}/>
          <ReloadIcon load={load}/>
          <WeatherInfo currentWeather={currentWeather} currentWeatherDetails={currentWeatherDetails} cityName={city} unitsSystem={unitsSystem}></WeatherInfo>
        </View>
        
        <Container style={{flex: 1, marginBottom: 30}}>
          <Text style={{textAlign: 'center', color: 'white', marginBottom: 5}}>Prédictions pour les 7 prochains jours</Text>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ flex: 1}}>
            <FutureForecastContainer>
              {currentWeatherDetails.daily ? (
                currentWeatherDetails.daily.map((day, index) => {
                  if (index !== 0) {
                    return <DailyForecast key={day.dt} day={day} index={index} unitsSystem={unitsText} />;
                  }
                })
              ) : (
                <NoWeather>Aucune donnée à afficher</NoWeather>
              )}
            </FutureForecastContainer>
          </ScrollView>
        </Container>

        <WeatherDetails style={{flex: 4}} currentWeather={currentWeather} currentWeatherDetails={currentWeatherDetails} unitsSystem={unitsSystem}/>
        
      </View>
    );
  }
  else if(errorMessage){
    return (
      <View style={styles.container}>
        <Text>{errorMessage}</Text>
        <StatusBar style="auto" />
        
      </View>
    );
  } 
  else {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.PRIMARY_COLOR} />
        <StatusBar style="auto" />
        
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  main : {
    flex: 1,
    justifyContent: "center",
  }
});

const Container = styled.View`
  flex: 1;
  background-color: dodgerblue;
  border: 2px solid white;
  border-radius: 20px;
`;

const NoWeather = styled.Text`
  text-align: center;
  color: white;
`;

const FutureForecastContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
`;