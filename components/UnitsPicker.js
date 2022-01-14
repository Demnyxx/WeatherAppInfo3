import React from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import {colors} from '../utils/index'

export default function UnitsPicker({ unitsSystem, setUnitsSystem }) {
    return (
        <View style={styles.unitsSystem}>
            <Picker
                selectedValue={unitsSystem}
                onValueChange={(item) => setUnitsSystem(item)}
                mode="dropdown"
                itemStyle={{ fontSize: 12 }}
            >
                <Picker.Item label="°C" value="metric" style={{color: colors.PRIMARY_COLOR, fontSize: 25}} />
                <Picker.Item label="°F" value="imperial" style={{color: colors.PRIMARY_COLOR, fontSize: 25, fontWeight: 'bold'}} />
            </Picker>
        </View>
    )
}
const styles = StyleSheet.create({
    unitsSystem: {
        position: 'absolute',
        ...Platform.select({
            ios: {
                top: -30,
            },
            android: {
                top: 30,
            },
        }),

        left: 20,
        height: 50,
        width: 100,
    },
})