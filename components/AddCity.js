import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addCity } from '../redux/actions/cities';
import GeoDBCitiesSearch from 'react-native-geodb';

export default function AddCity ({ navigation, route }) {
    const dispatch = useDispatch();
    const actions = bindActionCreators({
        addCity
    }, dispatch);

    useEffect(() => {

    }, []);

    return(
        /* Utilisation de l'API geodb cities (http://geodb-cities-api.wirefreethought.com/)
        *  à travers le module react-native-geodb (https://github.com/usmansbk/react-native-geodb/)
        *  Utilisation sans clé d'API - La liste des villes est limitée à celle dont la population
        *  est supérieure à 200000
        */
        <GeoDBCitiesSearch
            debounce={200}
            placeholder="Chercher une ville ..."
            placeholderTextColor="#000"
            onSelectItem={(data) => {
                actions.addCity(data)
                navigation.navigate("Home")
                //console.log(data)
            }}
            query={{
                //key: GEODB_API_KEY,
                api: 'geo',
                types: 'cities'
            }}
            params={{
                language: 'fr',
                limit: 10,
                offset: 0
            }}
            hidePoweredBy

            //renderLeftButton={() => {}}
            //renderItem={({ item }) => <CustomSearchItem />}
            //ListEmptyComponent={({ metadata, styles, source }) => <CustomEmptyList />}
            //styles={{...}}
        />
    )
    
}



const styles = StyleSheet.create({
    padding: {
        padding: 10
    },
    center: {
        justifyContent: "center",
        alignItems: "center"
    },
    bold: {
        fontWeight: "bold"
    }
});