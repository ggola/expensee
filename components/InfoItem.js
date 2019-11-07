import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

const InfoItem = props => {
    return (
        <View style={{...styles.detailContainer, ...props.styleDetailContainer}}>
            <View style={{...styles.iconContainer, ...props.styleIconContainer}}>
                <Ionicons size={props.iconSize} color={props.iconColor} name={props.iconName}/>
            </View>
            <Text style={{...styles.text, ...props.styleText}}>{props.text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    detailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: Colors.text
    }
});

export default InfoItem;