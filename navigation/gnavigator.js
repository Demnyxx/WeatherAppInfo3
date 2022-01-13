import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import WeatherScreen from "../components/WeatherScreen"
import ChosenCities from "../components/ChosenCities";
import AddCity from "../components/AddCity";

const Stack = createNativeStackNavigator();

export const GNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={ChosenCities}
              options={{
                title: 'Sélectionnez une ville',
                headerStyle: {
                  backgroundColor: 'rgba(41,134,204,1)',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }} />
            <Stack.Screen name="WScreen" component={WeatherScreen} 
              options={{
                title: 'Détails météo',
                headerStyle: {
                  backgroundColor: 'rgba(41,134,204,1)',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}/>
            <Stack.Screen name="AddCity" component={AddCity} 
              options={{
                title: 'Nouvelle ville',
                headerStyle: {
                  backgroundColor: 'rgba(41,134,204,1)',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}/>
        </Stack.Navigator>
    );
}

