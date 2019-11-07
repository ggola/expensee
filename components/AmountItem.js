import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

const AmountItem = props => {
    return (
        <View style={{...styles.container, ...props.styleContainer}}>
            <Text style={{...styles.text, ...props.styleText}}>{props.amount}</Text>
            <Text style={{...styles.text, ...props.styleText}}>{props.currency}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    text: {
        color: Colors.primary,
        fontFamily: 'roboto-bold'
    }
});

export default AmountItem;