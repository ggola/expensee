import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

const CountItem = props => {
    return (
        <View style={{...styles.countContainer, ...props.styleCountContainer}}>
            <Text style={{...styles.countText, ...props.styleCountText}}>{props.count}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    countContainer: {
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center'
    },
    countText: {
        color: 'white',
        fontFamily: 'roboto-bold'
    }
});

export default CountItem;