import React from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView, ScrollView, FlatList, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { removeCity } from '../redux/actions/cities';

const ChosenCities = ({ navigation, route }) => {

    const { cities } = useSelector(state => state.citiesReducer);
    const dispatch = useDispatch();
    const actions = bindActionCreators({
        removeCity
    }, dispatch);

    

    const renderCity = (city, index) => {
        return (
            <View style={{flexDirection: "row", marginBottom: 10 }}>
               
              <View style={{flex: 1, flexDirection: "row"}}>
                <TouchableOpacity style={{ flex: 9, paddingLeft: 10}}

                  onPress={
                    () => navigation.navigate("WScreen", {
                        latitude: city.latitude,
                        longitude: city.longitude,
                        cityName: city.city
                    })} 
                >
                  <View style={[styles.cityBox, {flex:1, flexDirection: 'row'}]}>
                    <Text style={styles.bold}>
                        {city.city}, {city.country}
                    </Text>
                  </View>
                </TouchableOpacity>
            
                
                <View style={[styles.row, {justifyContent: 'center', flex: 1}]}>
                    <TouchableOpacity
                        style={{
                            width: 25,
                            height: 25,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        onPress={() => actions.removeCity(index)}>
                        <Icon name="trash-outline" color='#000' type='ionicon' />
                    </TouchableOpacity>
                </View>
              </View>
              
            </View>
        );
    }

    return (
        <>
          <SafeAreaView style={{flex: 1, flexDirection: 'column'}}>
             

              <View style={{marginTop:20, flex: 6}}>
                  <View style={{flexDirection: "row", marginBottom: 10 }}>
                    
                    <View style={{flex: 1, flexDirection: "row", paddingLeft: 10}}>
                      <TouchableOpacity style={{ flex: 9}}
      
                        onPress={
                          () => navigation.navigate("WScreen", {
                              cityName: "UseGPSLocation"
                          })} 
                      >
                        <View style={[styles.cityBox, {flex:1, flexDirection: 'row', borderColor: '#11b717'}]}>
                          <Text style={[styles.bold, {color: '#11b717'}]}>
                              Utiliser ma localisation actuelle
                          </Text>
                        </View>
                      </TouchableOpacity>
                  
                      
                      <View style={[styles.row, {justifyContent: 'center', flex: 1}]}>
                          <View
                              style={{
                                  width: 0,
                                  height: 25,
                              }}
                          >
                          </View>
                      </View>
                    </View>
                    
                  </View>

                  <FlatList
                      data={cities}
                      keyExtractor={item => item.id}
                      showsVerticalScrollIndicator={false}
                      renderItem={({ item, index }) => renderCity(item, index)}
                  />
              </View>
                  
              <View style={ {flex: 1, alignItems: 'flex-end', marginTop: 20}}>
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderColor: 'rgba(41,134,204,1)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 70,
                    bottom: 10,
                    right: 10,
                    height: 70,
                    backgroundColor: '#fff',
                    borderRadius: 100,
                  }}
                  onPress={
                    () => navigation.navigate("AddCity")
                  }
                >
                  <Icon name='plus' size={30} color='#2986cc' type='font-awesome-5'/>
                </TouchableOpacity>
              </View>
        
          </SafeAreaView>

          
        </>
    );
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
        fontWeight: "bold",
        color: 'rgba(41,134,204,1)'
    },
    row: {
        flexDirection: "row",
        alignItems: "center"
    },
    cityBox: {
      borderWidth: 1,
      borderColor: 'rgba(41,134,204,1)',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
      borderRadius: 10,
    },
});

export default ChosenCities