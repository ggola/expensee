import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import Colors from '../constants/Colors';

const ThumbImageItem = props => {
    return(
        <TouchableOpacity
            activeOpacity={0,7}
            disabled={ props.error ? true : false}
            onPress={() => {
                props.navigation.navigate({
                    routeName: 'ReceiptPicture',
                    params: {
                        imageUri: props.imageUri
                    }
                })
            }}>
            <View style={styles.imageContainer}>
                { props.error ? 
                <Text 
                    numberOfLines={3} 
                    style={styles.errorText}>
                    Image not found</Text>
                :
                <Image 
                    source={{ uri: props.imageUri }}
                    style={styles.image}/>
                }
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Colors.primary,
        borderWidth: 1,
        height: 130,
        width: 80,
        borderRadius: 6,
        overflow: 'hidden',
        marginRight: 15
    },
    image: {
        height: 135,
        width: 80,
    },
    errorText: {
        fontSize: 14,
        fontFamily: 'roboto-medium',
        color: Colors.text,
        textAlign: 'center',
        paddingHorizontal: 5
    }
});

export default ThumbImageItem;